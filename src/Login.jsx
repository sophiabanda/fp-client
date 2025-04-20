import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export function Login({ visitorId, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [trustDevice, setTrustDevice] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [code, setCode] = useState('');
  const [pendingTrust, setPendingTrust] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5001/login', {
      method: 'POST',
      body: JSON.stringify({ username, password, visitorId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const result = await response.json();
    if (result.idMatch) {
      setUser(true);
      navigate('/welcome');
    } else {
      setPendingTrust(true);
      setShow2FA(true);
    }
  };

  const handleVerify = async () => {
    if (code === '123456') {
      if (trustDevice && pendingTrust) {
        const trustRes = await fetch('http://localhost:5001/trust-device', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, visitorId }),
        });

        if (!trustRes.ok) {
          console.warn('Failed to trust device');
        }
      }

      setUser(true);
      navigate('/welcome');
    } else {
      alert('Invalid code');
    }
  };

  return (
    <div>
      {!show2FA ? (
        <form onSubmit={handleLogin}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            id="checkbox"
            type="checkbox"
            checked={trustDevice}
            onChange={() => setTrustDevice(!trustDevice)}
          />
          <label htmlFor="checkbox">Trust This Device</label>
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <h3>Enter 2FA Code</h3>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
          />
          <button onClick={handleVerify}>Verify</button>
        </div>
      )}
    </div>
  );
}
