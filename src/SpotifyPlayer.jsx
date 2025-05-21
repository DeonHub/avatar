import { useEffect, useState } from 'react';
import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const SCOPES = ['streaming', 'user-read-email', 'user-read-private'];

const SpotifyPlayer = () => {
  const [token, setToken] = useState(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hash.get('access_token');
    if (accessToken) setToken(accessToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: 'Web Playback SDK Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      player.connect().then(success => {
        if (success) {
          console.log('Spotify player connected');
          setPlayer(player);
        }
      });
    };
  }, [token]);

  const playSong = async (trackId) => {
    const deviceId = await getDeviceId(player);
    await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      { uris: [`spotify:track:${trackId}`] },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const getDeviceId = (player) => new Promise(resolve => {
    player.addListener('ready', ({ device_id }) => {
      resolve(device_id);
    });
  });

  const login = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES.join('%20')}`;
    window.location.href = authUrl;
  };

  return (
    <div>
      {!token ? (
        <button onClick={login}>Login with Spotify</button>
      ) : (
        <>
          <h1>Spotify Player</h1>
          <button onClick={() => playSong("11dFghVXANMlKmJXsNCbNl")}>Play "Hey Ya!"</button>
        </>
      )}
    </div>
  );
};

export default SpotifyPlayer;
