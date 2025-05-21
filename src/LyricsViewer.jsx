import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LyricsViewer = () => {
  const [lyricsHtml, setLyricsHtml] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

//   const title = new URLSearchParams(window.location.search).get('title');
//   const artist = new URLSearchParams(window.location.search).get('artist');

  const title = "Hello";
  const artist = "Adele";

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const query = `${title}`;
        const searchResponse = await axios.get(`https://api.genius.com/search?q=${encodeURIComponent(query)}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GENIUS_ACCESS_TOKEN}`,
          },
        });

        console.log("Reached here")

        const hit = searchResponse.data.response.hits.find(
          (h) =>
            h.result.title.toLowerCase() === title?.toLowerCase() &&
            h.result.artist_names.toLowerCase().includes(artist?.toLowerCase())
        );

        if (!hit) {
          setError('Lyrics not found');
          return;
        }

        const songId = hit.result.id;
        const songResponse = await axios.get(`https://api.genius.com/songs/${songId}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GENIUS_ACCESS_TOKEN}`,
          },
        });

        const embed = songResponse.data.response.song.embed_content;
        setLyricsHtml(embed);
      } catch (err) {
        console.error('Error fetching lyrics:', err);
        setError('Error fetching lyrics');
      } finally {
        setLoading(false);
      }
    };

    fetchLyrics();
  }, [title, artist]);

  return (
    <div style={{ padding: 16 }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: lyricsHtml }} />
      )}
    </div>
  );
};

export default LyricsViewer;
