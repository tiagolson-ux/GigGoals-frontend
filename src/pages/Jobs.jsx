import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mockApi from "../services/mockApi";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await mockApi.get("/gigs");
        setJobs(res.data);
      } catch (err) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job application?")) {
      try {
        await mockApi.delete(`/gigs/${id}`);
        setJobs(jobs.filter(job => job._id !== id));
      } catch (err) {
        setError("Failed to delete job");
      }
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await mockApi.put(`/gigs/${id}`, { status: newStatus });
      setJobs(jobs.map(job => job._id === id ? res.data : job));
    } catch (err) {
      setError("Failed to update status");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="jobs-page">
      <Navbar />
      <div className="jobs-container">
        <div className="jobs-header">
          <h1>My Job Applications</h1>
          <button
            className="primary-btn"
            onClick={() => navigate("/create")}
          >
            Add New Application
          </button>
        </div>

        <div className="jobs-list">
          {jobs.length > 0 ? (
            jobs.map(job => (
              <JobCard
                key={job._id}
                job={job}
                onDelete={handleDelete}
                onStatusUpdate={handleStatusUpdate}
              />
            ))
          ) : (
            <div className="empty-state-large">
              <div className="empty-icon">📂</div>
              <h3>No Applications Yet</h3>
              <p>Start tracking your job search by adding your first application.</p>
              <button className="primary-btn" onClick={() => navigate("/create")}>
                Add Application
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
