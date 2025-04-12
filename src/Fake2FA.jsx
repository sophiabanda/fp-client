import { useNavigate } from 'react-router-dom';

export function Fake2FA({ onSuccess }) {
  const navigate = useNavigate();

  const handleVerify = () => {
    onSuccess();
    navigate('/welcome');
  };

  return (
    <div>
      <h2>Two-Factor Authentication</h2>
      <p>Enter your 6-digit code</p>
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}
