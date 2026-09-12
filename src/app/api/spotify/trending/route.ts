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

export async function GET() {
  try {
    const accessToken = await getSpotifyToken();

    // Use dynamic current year
    const currentYear = new Date().getFullYear();
    const prevYear = currentYear - 1;

    // Running targeted searches prioritizing current year and latest soundtracks
    const queries = [
      `year:${currentYear} tamil`,
      `year:${prevYear} tamil`,
      'Tamil soundtrack',
      'Anirudh Ravichander Tamil',
      'A.R. Rahman Tamil',
      'Santhosh Narayanan Tamil',
    ];

    const allItems: any[] = [];

    for (const q of queries) {
      try {
        const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=album&market=IN&limit=8`;
        const res = await fetch(searchUrl, {
          headers: { 'Authorization': `Bearer ${accessToken}` },
          next: { revalidate: 86400 }, // Daily 24-hour cache
        });
        if (res.ok) {
          const d = await res.json();
          if (d.albums?.items) {
            allItems.push(...d.albums.items);
          }
        }
      } catch (err) {
        console.error(`Search query failed for "${q}":`, err);
      }
    }

    // Filter for legitimate soundtrack/albums with at least 3 tracks
    const validAlbums = allItems.filter(
      (item: any) =>
        item &&
        item.name &&
        item.total_tracks >= 3 &&
        item.images &&
        item.images.length > 0
    );

    // Deduplicate by album ID and normalize title
    const uniqueMap = new Map();
    validAlbums.forEach((alb: any) => {
      let cleanName = alb.name
        .replace(/\s*\([^)]*Original Motion Picture Soundtrack[^)]*\)/gi, '')
        .replace(/\s*\[[^\]]*Original Motion Picture Soundtrack[^\]]*\]/gi, '')
        .replace(/\s*\(Original Soundtrack\)/gi, '')
        .replace(/\s*\(Tamil\)/gi, '')
        .replace(/\s*\[Tamil\]/gi, '')
        .replace(/\s*-\s*Tamil/gi, '')
        .trim();

      if (!uniqueMap.has(alb.id) && cleanName.length > 1) {
        uniqueMap.set(alb.id, {
          id: alb.id,
          name: cleanName,
          artist: alb.artists?.[0]?.name || 'Various Artists',
          releaseDate: alb.release_date || '',
          totalTracks: alb.total_tracks || 0,
          imageUrl: alb.images?.[1]?.url || alb.images?.[0]?.url || '',
        });
      }
    });

    const topAlbums = Array.from(uniqueMap.values()).slice(0, 6);

    return NextResponse.json({ albums: topAlbums });
  } catch (error: any) {
    console.error('Error in /api/spotify/trending:', error);
    return NextResponse.json({ albums: [] });
  }
}
