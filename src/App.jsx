import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { Landing } from './Landing';
import { Login } from './Login';

export default function App() {
  const [visitorId, setVisitorId] = useState(null);
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoading, error } = useVisitorData(
    { extendedResult: true },
    { immediate: true }
  );

  useEffect(() => {
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
      } catch (err) {
        console.error('Failed to complete Sealed Client Results flow:', err);
      }
    };
    fetchSealedResult();
  }, []);

  return (
    <Router>
      <nav>
        <header>
          <img src="lumon_logo_wordmark.svg" alt="lumon-logo" />
          <button>Sign Out</button>
        </header>
      </nav>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
