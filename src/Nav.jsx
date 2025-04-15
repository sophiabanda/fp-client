import './Nav.css';

export function Nav({ user }) {
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <nav>
      <header>
        <img src="lumon_logo_wordmark.svg" alt="lumon-logo" />
        {user ? <button>Logout</button> : <p>Welcome</p>}
      </header>
    </nav>
  );
}
