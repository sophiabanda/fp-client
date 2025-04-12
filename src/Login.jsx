import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export function Login({ fingerprint }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [trustDevice, setTrustDevice] = useState(false);
  const [twoFA, setTwoFA] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('http://localhost:5001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        fingerprint,
      }),
    });

    const data = await res.json();
    console.log(data);
    document.getElementById('status').innerText = data.message || data.error;
  }

  return (
    <>
      <form id="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <div id="status"></div>
    </>
  );
}
