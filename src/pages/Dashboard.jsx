import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);   // Note to self: track loading state
  const [error, setError] = useState(null);       // Note to self: track error state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await api.get("/gigs");
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const countByStatus = (status) => {
    return jobs.filter((job) => job.status === status).length;
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <Navbar />
        <div className="dashboard-container">
          <h2>Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <Navbar />
        <div className="dashboard-container">
          <h2>{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome Back 👋</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Applications</h3>
            <p>{jobs.length}</p>
          </div>

          <div className="stat-card">
            <h3>Interviewing</h3>
            <p>{countByStatus("Interviewing")}</p>
          </div>

          <div className="stat-card">
            <h3>Offers</h3>
            <p>{countByStatus("Offer")}</p>
          </div>

          <div className="stat-card">
            <h3>Rejected</h3>
            <p>{countByStatus("Rejected")}</p>
          </div>
        </div>

        <div className="dashboard-actions">
          <button
            className="primary-btn"
            onClick={() => navigate("/jobs")}
          >
            View Applications
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;



