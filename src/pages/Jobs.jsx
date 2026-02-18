import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/gigs");
        setJobs(response.data);
      } catch (err) {
        console.error("Fetch jobs error:", err);
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    const q = search.toLowerCase();

    return jobs.filter((job) => {
      return (
        (job.title || "").toLowerCase().includes(q) ||
        (job.description || "").toLowerCase().includes(q) ||
        (job.location || "").toLowerCase().includes(q) ||
        (job.status || "").toLowerCase().includes(q)
      );
    });
  }, [jobs, search]);

  const handleDelete = async (id) => {
    try {
      setError("");
      setSuccess("");

      await api.delete(`/gigs/${id}`);

      setJobs((prev) => prev.filter((j) => j._id !== id));

      setSuccess("Deleted successfully ✅");
      setTimeout(() => setSuccess(""), 1500);
    } catch (err) {
      console.error("Delete error:", err);
      setError("Delete failed.");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setError("");
      setSuccess("");

      const res = await api.put(`/gigs/${id}`, { status: newStatus });

      setJobs((prev) =>
        prev.map((j) => (j._id === id ? res.data : j))
      );

      setSuccess("Status updated ✅");
      setTimeout(() => setSuccess(""), 1500);
    } catch (err) {
      console.error("Status update error:", err);
      setError("Status update failed.");
    }
  };

  return (
    <div className="jobs-page">
      <Navbar />

      <main className="jobs-container">
        <div className="jobs-header">
          <div>
            <h1 className="jobs-title">
              Applications: {jobs.length}
            </h1>
            <p className="jobs-subtitle">
              Track every application in one place.
            </p>
          </div>

          <div className="jobs-controls">
            <input
              className="search-input"
              type="text"
              placeholder="Search company, role, location, status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* FIXED: This should go to create page */}
            <button
              className="primary-btn"
              onClick={() => navigate("/create")}
            >
              + Add Job
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
          </div>
        </div>

        {error && <div className="toast error-toast">{error}</div>}
        {success && <div className="toast success-toast">{success}</div>}

        {loading ? (
          <p className="loading">Loading applications...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="no-jobs">No applications found.</p>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Jobs;
