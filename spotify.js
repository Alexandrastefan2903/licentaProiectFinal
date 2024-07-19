const axios = require('axios');

const clientId = 'e74b11f55d3346849cfd83b39d3e8686';
const clientSecret = '2dded7fb8d4d4311aa985e0ca31ffe18';

// Obține token-ul de acces
const getAccessToken = async () => {
  const response = await axios.post('https://accounts.spotify.com/api/token', null, {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      grant_type: 'client_credentials'
    }
  });

  return response.data.access_token;
};

const createPlaylist = async (accessToken, userId, name, description) => {
  const response = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    name: name,
    description: description,
    public: false
  }, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data.id;
};

const addTracksToPlaylist = async (accessToken, playlistId, trackUris) => {
  await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    uris: trackUris
  }, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
};

const main = async () => {
  const accessToken = await getAccessToken();
  const userId = 'YOUR_SPOTIFY_USER_ID'; 

  const playlists = [
    { type: 'D', name: 'Personality D Playlist', description: 'A playlist for Personality Type D' },
    { type: 'I', name: 'Personality I Playlist', description: 'A playlist for Personality Type I' },
    { type: 'S', name: 'Personality S Playlist', description: 'A playlist for Personality Type S' },
    { type: 'C', name: 'Personality C Playlist', description: 'A playlist for Personality Type C' }
  ];

  const trackUris = {
    'D': [
      'spotify:track:1b22eF9mAokmbxEUSKwjw2', // Queen - We Will Rock You
      'spotify:track:4D6dBoGTqMleOFAaq6Okyh', // Survivor - Eye of the Tiger
      'spotify:track:0RveIeeUcjolK6bUl0g9dB', // Kanye West - Stronger
      'spotify:track:7I4EKPz5NDkzXgspoNbdSZ', // Eminem - Lose Yourself
      'spotify:track:56TArfUCGrkZ6aNBqEOO2E', // Rage Against The Machine - Killing In The Name
      'spotify:track:57bgtoPSgt236HzfBOd8kj', // AC/DC - Thunderstruck
      'spotify:track:0pqnGHJpmpxLKifKRmU6WP'  // Imagine Dragons - Believer
    ],
    'I': [
      'spotify:track:60nZcImufyMA1MKQY3dcCH', // Pharrell Williams - Happy
      'spotify:track:6JV2JOEocMgcZxYSZelKcc', // Justin Timberlake - Can't Stop the Feeling!
      'spotify:track:3y2kq0cBIAjFSL6tUTnFxw', // Katy Perry - Roar
      'spotify:track:3jTqETaX9ulK0NS2Y7r5wj', // Mark Ronson feat. Bruno Mars - Uptown Funk
      'spotify:track:2KpCkxaWFl7MywrqtZZFdr', // Black Eyed Peas - I Gotta Feeling
      'spotify:track:7ByoMfM4S0uNLsZhnIRRRT', // Taylor Swift - Shake It Off
      'spotify:track:6F35mWFPu8aHJJ6K4BXhZb'  // Bruno Mars - 24K Magic
    ],
    'S': [
      'spotify:track:0tgVpDi06FyKpA1z0VMD4v', // Ed Sheeran - Perfect
      'spotify:track:4kflIGfjdZJW4ot2ioixTB', // Adele - Someone Like You
      'spotify:track:1Yr20wwMLJjFpFGqpdE6Z8', // Norah Jones - Don't Know Why
      'spotify:track:3Y8JrWZ1P2YxdOshF51HNA', // John Legend - All of Me
      'spotify:track:3AJwUDP919kvQ9QcozQPxg', // Coldplay - Fix You
      'spotify:track:1ThmUqzzDUyDB9VIzUauEM', // Bill Withers - Lean on Me
      'spotify:track:3Kkjo3cT83cw09VJyrLNwX'  // The Beatles - Let It Be
    ],
    'C': [
      'spotify:track:7kTh53hpFxfuIkAHN3LkBe', // Beethoven - Symphony No. 5
      'spotify:track:1qEmbBh6e0aQzfpSjCAaGc', // Ludovico Einaudi - Nuvole Bianche
      'spotify:track:5cqAwdIFvVbfW9XZTIHO3X', // Hans Zimmer - Time (Inception)
      'spotify:track:4uLU6hMCjMI75M1A2tKUQC', // Vivaldi - Four Seasons (Spring)
      'spotify:track:4iLqG9SeJSnt0cSPICSjxv', // Yo-Yo Ma - The Cello Suites (Bach)
      'spotify:track:2TMDvVfTIo33l1fBoRUsyJ', // Chopin - Nocturne op.9 No.2
      'spotify:track:5sCPrBL9nrxOwvjQNuTLXz'  // Debussy - Clair de Lune
    ]
  };

  for (const playlist of playlists) {
    const playlistId = await createPlaylist(accessToken, userId, playlist.name, playlist.description);
    await addTracksToPlaylist(accessToken, playlistId, trackUris[playlist.type]);
    console.log(`Created playlist ${playlist.name} with ID: ${playlistId}`);
  }
};

main().catch(console.error);
