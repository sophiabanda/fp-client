import './App.css';
import { useState, useEffect } from 'react';
import { Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { Landing } from './Landing';
import { Login } from './Login';
import { Nav } from './Nav';

export default function App() {
  const [visitorId, setVisitorId] = useState(null);
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchSealedResult = async () => {
      try {
        const fp = await FingerprintJS.load({
          apiKey: '6mtUaNcPcmQORr5lg6wm',
        });

        const identification = await fp.get({ cache: true });
        const sealed = identification.sealedResult;

        const response = await fetch('http://localhost:5001/sealed', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sealed }),
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        const responseData = await response.json();
        setServerData(responseData);
        const idData = responseData?.data?.products?.identification?.data;
        setVisitorId(idData?.visitorId);
      } catch (err) {
        console.error('Failed to complete Sealed Client Results flow:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSealedResult();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BrowserRouter>
          <Nav user={user} />
          <Routes>
            {user ? (
              <Route
                path="/welcome"
                element={<Landing serverData={serverData} />}
              ></Route>
            ) : (
              <Route path="/" element={<Login />}></Route>
            )}
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
