import './Nav.css';

export function Nav({ handleLogout, user }) {
  return (
    <nav>
      <header>
        <img src="lumon_logo_wordmark.svg" alt="lumon-logo" />
        {user ? <button onClick={handleLogout}>Logout</button> : null}
      </header>
    </nav>
  );
}
