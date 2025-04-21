import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { Landing } from './Landing';
import { Login } from './Login';
import { Nav } from './Nav';

export default function App() {
  const [visitorId, setVisitorId] = useState(null);
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : false;
  });

  useEffect(() => {
    const fetchSealedResult = async () => {
      setLoading(true);
      try {
        const fp = await FingerprintJS.load({ apiKey: '6mtUaNcPcmQORr5lg6wm' });
        const identification = await fp.get({ cache: true });
        const sealed = identification.sealedResult;

        const response = await fetch(
          'https://fp-backend-dqpa.onrender.com/sealed',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sealed }),
          }
        );

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

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(false);
    alert(`You've been logged out.`);
  };

  return (
    <BrowserRouter>
      <Nav handleLogout={handleLogout} user={user} />
      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <div className="loader"></div>
            ) : (
              <Login setUser={handleLogin} visitorId={visitorId} />
            )
          }
        />
        <Route
          path="/welcome"
          element={
            loading ? (
              <div className="loader"></div>
            ) : user ? (
              <Landing serverData={serverData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
