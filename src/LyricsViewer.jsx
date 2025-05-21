
  // You can later replace these with URL params if needed
  //   const title = new URLSearchParams(window.location.search).get('title');
//   const artist = new URLSearchParams(window.location.search).get('artist');

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LyricsViewer = () => {
  const [iframeContent, setIframeContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // const title = "Hello";
  // const artist = "Adele";
  const title = new URLSearchParams(window.location.search).get('title');
  const artist = new URLSearchParams(window.location.search).get('artist');

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/get-song-lyrics`, {
          params: { title, artist },
        });

        const fullHtml = `
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body { margin: 0; padding: 0; font-family: sans-serif; }
                .rg_embed_link { width: 100% !important; }
              </style>
            </head>
            <body>
              ${response.data.embed}
            </body>
          </html>
        `;

        setIframeContent(fullHtml);

        // Wait 5 seconds after iframe is set to stop the loader
        setTimeout(() => setLoading(false), 5000);
      } catch (err) {
        console.error('Error fetching lyrics:', err);
        setError('Error fetching lyrics');
        setLoading(false);
      }
    };

    fetchLyrics();
  }, [title, artist]);

  const loaderIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center p-4">
      {loading ? (
        <Spin indicator={loaderIcon} tip="Loading lyrics..." className="text-center" />
      ) : error ? (
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      ) : (
        <iframe
          title="Lyrics Embed"
          srcDoc={iframeContent}
          className="w-full h-[90vh] border-none rounded-lg shadow-md"
        />
      )}
    </div>
  );
};

export default LyricsViewer;
