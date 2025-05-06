import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, HashRouter, Navigate } from 'react-router-dom';
import {
  FpjsProvider,
  useVisitorData,
} from '@fingerprintjs/fingerprintjs-pro-react';

import { Landing } from './Landing';
import { Login } from './Login';
import { Nav } from './Nav';

function AppContent() {
  const { data: visitorData, isLoading: fpLoading } = useVisitorData({
    extendedResult: true,
  });
function App() {
  const { data: visitorData, isLoading: fpLoading } = useVisitorData({
    extendedResult: true,
  });
  const [visitorId, setVisitorId] = useState(null);
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : false;
  });
  useEffect(() => {
    const fetchSealedResult = async () => {
      if (!visitorData?.sealedResult) return;
      if (!visitorData?.sealedResult) return;
      setLoading(true);


      try {
        const response = await fetch(
          'https://fp-backend-dqpa.onrender.com/sealed',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sealed: visitorData.sealedResult }),
            body: JSON.stringify({ sealed: visitorData.sealedResult }),
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
  }, [visitorData]);
  }, [visitorData]);

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
    <HashRouter>
      <Nav user={user} />
      <Routes>
        <Route
          path="/"
          element={
            loading || fpLoading ? (
              <div className="loader"></div>
            ) : (
              <Login setUser={handleLogin} visitorId={visitorId} />
            )
          }
        />
        <Route
          path="/welcome"
          element={
            loading || fpLoading ? (
              <div className="loader"></div>
            ) : user ? (
              <Landing handleLogout={handleLogout} serverData={serverData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </HashRouter>
  );
}
export default function App() {
  return (
    <FpjsProvider loadOptions={{ apiKey: '6mtUaNcPcmQORr5lg6wm' }}>
      <AppContent />
    </FpjsProvider>
  );
}
