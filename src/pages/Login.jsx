import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import logoVideo from "../assets/10051254.mp4";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      const user = response.data.user;

      login(token, user);
      navigate("/dashboard");
    } catch  {
      setError("Login failed. Check credentials.");
    }
  };

return (
  <div className="center-page">
    <div className="card">

      {/* LOGO */}
      <video
        src={logoVideo}
        autoPlay
        loop
        muted
        playsInline
        className="logo-video"
      />

      <h2 className="title">Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: "15px" }}>
        No account? <Link to="/register">Register</Link>
      </p>

    </div>
  </div>
);
}

export default Login;
