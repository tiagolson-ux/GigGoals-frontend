import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <div className="nav-logo-icon">✨</div>
          <h2>GigGoals</h2>
        </Link>

        {user && (
          <div className="nav-content">
            <div className="nav-links">
              <Link
                to="/dashboard"
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              <Link
                to="/jobs"
                className={`nav-link ${isActive('/jobs') ? 'active' : ''}`}
              >
                My Applications
              </Link>
              <Link
                to="/create"
                className={`nav-link ${isActive('/create') ? 'active' : ''}`}
              >
                Add Application
              </Link>
            </div>

            <div className="nav-user-actions">
              <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              <div className="user-profile-pill">
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user.name}</span>
              </div>

              <button onClick={handleLogout} className="logout-btn-new">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
