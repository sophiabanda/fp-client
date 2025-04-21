import './Nav.css';

export function Nav({ handleLogout, user }) {
  return (
    <nav className="nav-container">
      <header>
        <img src="lumon_logo_wordmark.svg" alt="lumon-logo" />
        {user ? (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : null}
      </header>
    </nav>
  );
}
