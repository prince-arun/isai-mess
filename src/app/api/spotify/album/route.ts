import { NextResponse } from 'next/server';

async function getSpotifyToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET missing in environment.');
  }

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
    },
    body: 'grant_type=client_credentials',
    next: { revalidate: 3500 },
  });

  const data = await res.json();
  if (!data.access_token) {
    throw new Error(`Failed to authenticate with Spotify: ${JSON.stringify(data)}`);
  }

  return data.access_token;
}

// Convert ms to "mm:ss" and price string "m.ss"
function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedSecs = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return {
    duration: `${minutes}:${formattedSecs}`,
    price: `${minutes}.${formattedSecs}`,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Album ID is required' }, { status: 400 });
    }

    const accessToken = await getSpotifyToken();

    const res = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errData = await res.json();
      return NextResponse.json({ error: errData.error?.message || 'Album not found' }, { status: res.status });
    }

    const album = await res.json();

    // Extract copyright text for Audio Label if available
    let label = album.label || 'Spotify Audio';
    if (album.copyrights && album.copyrights.length > 0) {
      const copyrightText = album.copyrights[0].text;
      // Strip year numbers if leading, e.g. "1992 Lahari Music" -> "Lahari Music"
      label = copyrightText.replace(/^\d{4}\s*/, '').trim() || label;
    }

    // Main composer / primary artist
    const musicDirector = album.artists?.[0]?.name || 'Unknown Artist';

    // Format tracks array
    const rawTracks = album.tracks?.items || [];
    const tracks = rawTracks.map((t: any, index: number) => {
      const { duration, price } = formatDuration(t.duration_ms || 0);
      const singers = (t.artists || []).map((a: any) => a.name).join(', ');
      return {
        id: t.id || `st-${index}`,
        name: t.name,
        singers,
        duration,
        price,
      };
    });

    // Format release date (e.g. "1992-08-15" -> "15-AUG-1992")
    let releaseDate = album.release_date || '';
    if (releaseDate.includes('-')) {
      const parts = releaseDate.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const monthNum = parseInt(parts[1], 10) - 1;
        const day = parts[2];
        const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        releaseDate = `${day}-${monthNames[monthNum] || parts[1]}-${year}`;
      }
    }

    // High res cover art URL
    const bgImage = album.images?.[0]?.url || album.images?.[1]?.url || '';

    // Cleaned up movie title
    let movieTitle = album.name || '';
    // Strip "(Original Motion Picture Soundtrack)" if present for cleaner title
    movieTitle = movieTitle.replace(/\s*\([^)]*Soundtrack[^)]*\)/gi, '').trim();

    return NextResponse.json({
      movieTitle,
      musicDirector,
      director: 'Cinema Director',
      studio: 'Panchathan / Recording Studio',
      label,
      releaseDate,
      audioSpecs: 'Spotify HD Stereo / 320kbps',
      hotelName: `${movieTitle.toUpperCase()} இசை உணவகம்`,
      hotelSubtitle: `${musicDirector} Special Audio Feast`,
      bgImage,
      tracks,
    });
  } catch (error: any) {
    console.error('Error in /api/spotify/album:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch album details' },
      { status: 500 }
    );
  }
}
