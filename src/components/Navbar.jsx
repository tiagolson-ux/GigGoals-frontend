import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoVideo from "../assets/10051254.mp4";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="nav">
      <div className="nav-left">
        <video
          src={logoVideo}
          autoPlay
          loop
          muted
          playsInline
          className="nav-logo"
        />
        <span className="nav-brand">GigGoals</span>
      </div>

      <nav className="nav-links">
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
        <Link className="nav-link" to="/jobs">Applications</Link>
        <button className="nav-btn" onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}

export default Navbar;
