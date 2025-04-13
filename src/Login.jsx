import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export function Login({ visitorId, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [trustDevice, setTrustDevice] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5001/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      alert('Login failed');
      return;
    }

    const isTrusted = localStorage.getItem(`trusted_${visitorId}`);
    if (isTrusted) {
      setUser(true);
      navigate('/welcome');
    } else {
      setShow2FA(true);
    }

    if (trustDevice && visitorId) {
      localStorage.setItem(`trusted_${visitorId}`, 'true');
    }
  };

  const handleVerify = () => {
    if (code === '123456') {
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
            type="checkbox"
            checked={trustDevice}
            onChange={() => setTrustDevice(!trustDevice)}
          />
          <label>Trust This Device</label>
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
