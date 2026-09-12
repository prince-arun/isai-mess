import { NextResponse } from 'next/server';

// Helper to get Spotify Client Credentials Access Token
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
    next: { revalidate: 3500 }, // Cache token for 1 hour
  });

  const data = await res.json();
  if (!data.access_token) {
    throw new Error(`Failed to authenticate with Spotify: ${JSON.stringify(data)}`);
  }

  return data.access_token;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ albums: [] });
    }

    const accessToken = await getSpotifyToken();

    const spotifyRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=8`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    const spotifyData = await spotifyRes.json();
    const rawAlbums = spotifyData.albums?.items || [];

    const albums = rawAlbums.map((item: any) => ({
      id: item.id,
      name: item.name,
      artist: item.artists?.[0]?.name || 'Unknown Artist',
      releaseDate: item.release_date || '',
      totalTracks: item.total_tracks || 0,
      imageUrl: item.images?.[0]?.url || item.images?.[1]?.url || '',
    }));

    return NextResponse.json({ albums });
  } catch (error: any) {
    console.error('Error in /api/spotify/search:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to search Spotify' },
      { status: 500 }
    );
  }
}
