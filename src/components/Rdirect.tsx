import { useEffect, useState } from 'react';

function Rdirect() {
  const [longUrl, setLongUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function getdata() {
      try {
        const shortUrl = window.location.pathname.substring(1);
        if (shortUrl) {
          const response = await fetch('https://url-backend-9vfx.onrender.com/get-long-url', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shortUrl }),
          });
          const data = await response.json();
          if (response.ok) {
            setLongUrl(data.longUrl);
            setError('');
          } else {
            setLongUrl('');
            setError(data.error);
          }
        }
      } catch (error) {
        console.error('Error:', error);
        setLongUrl('');
        setError('An error occurred');
      }
    }

    getdata();
    console.log(error);
  }, []);

  useEffect(() => {
    if (longUrl) {
      window.location.href = longUrl;
    }
  }, [longUrl]);

  return (
    <div className='w-full h-full min-w-[100vw] min-h-[100vh] bg-white'>
      
    </div>
  );
}

export default Rdirect;
