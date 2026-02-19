import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mockApi from "../services/mockApi";
import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await mockApi.get("/gigs");
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
    return jobs.filter(job => job.status === status).length;
  };

  const getRecentJobs = () => {
    return jobs.slice(0, 3);
  };

  const getTopCompanies = () => {
    const companies = {};
    jobs.forEach(job => {
      companies[job.company] = (companies[job.company] || 0) + 1;
    });
    return Object.entries(companies)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  };

  const getSuccessRate = () => {
    if (jobs.length === 0) return 0;
    return Math.round((countByStatus("Offer") / jobs.length) * 100);
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <Navbar />
        <div className="loading">Loading your dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <Navbar />
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">🎯 Job Application Dashboard</h1>
          <p className="dashboard-subtitle">Track your career journey in real-time</p>
        </div>

        {/* Bento Box Grid Layout */}
        <div className="bento-grid">
          {/* Row 1: Stats Overview */}
          <div className="bento-card bento-card--large bento-card--primary" style={{ gridColumn: 'span 4' }}>
            <div className="bento-card-header">
              <div className="bento-card-icon">📊</div>
              <h3>All Applications</h3>
            </div>
            <div className="bento-card-content">
              <div className="bento-card-number">{jobs.length}</div>
              <div className="bento-card-trend">+{Math.floor(Math.random() * 5) + 1} this week</div>
            </div>
            <div className="bento-card-footer">
              <button className="bento-card-action" onClick={() => navigate("/jobs")}>
                View All →
              </button>
            </div>
          </div>

          <div className="bento-card bento-card--medium bento-card--accent" style={{ gridColumn: 'span 4' }}>
            <div className="bento-card-header">
              <div className="bento-card-icon">📅</div>
              <h3>Interviews</h3>
            </div>
            <div className="bento-card-content">
              <div className="bento-card-number">{countByStatus("Interviewing")}</div>
              <div className="bento-card-trend">Active conversations</div>
            </div>
          </div>

          <div className="bento-card bento-card--medium bento-card--success" style={{ gridColumn: 'span 4' }}>
            <div className="bento-card-header">
              <div className="bento-card-icon">🎉</div>
              <h3>Offers</h3>
            </div>
            <div className="bento-card-content">
              <div className="bento-card-number">{countByStatus("Offer")}</div>
              <div className="bento-card-trend">Congratulations!</div>
            </div>
          </div>

          {/* Row 2: Secondary Stats */}
          <div className="bento-card bento-card--medium bento-card--info" style={{ gridColumn: 'span 6', gridRow: 'span 1' }}>
            <div className="bento-card-header">
              <div className="bento-card-icon">📈</div>
              <h3>Success Rate</h3>
            </div>
            <div className="bento-card-content">
              <div className="bento-card-number">{getSuccessRate()}%</div>
            </div>
          </div>

          <div className="bento-card bento-card--medium bento-card--warning" style={{ gridColumn: 'span 6', gridRow: 'span 1' }}>
            <div className="bento-card-header">
              <div className="bento-card-icon">❌</div>
              <h3>Rejected</h3>
            </div>
            <div className="bento-card-content">
              <div className="bento-card-number">{countByStatus("Rejected")}</div>
            </div>
          </div>

          {/* Row 3: Content */}
          <div className="bento-card bento-card--wide bento-card--secondary">
            <div className="bento-card-header">
              <div className="bento-card-icon">🚀</div>
              <h3>Recent Applications</h3>
            </div>
            <div className="bento-card-content">
              <div className="recent-applications">
                {getRecentJobs().length > 0 ? (
                  getRecentJobs().map(job => (
                    <div key={job._id} className="recent-app-item">
                      <div className="recent-app-info">
                        <div className="recent-app-title">{job.title}</div>
                        <div className="recent-app-company">{job.company}</div>
                      </div>
                      <div className={`recent-app-status status-${job.status.toLowerCase()}`}>
                        {job.status}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">No applications yet</div>
                )}
              </div>
            </div>
            <div className="bento-card-footer">
              <button className="bento-card-action" onClick={() => navigate("/jobs")}>
                See All →
              </button>
            </div>
          </div>

          <div className="bento-card bento-card--tall bento-card--primary" style={{ gridColumn: 'span 4', gridRow: 'span 2' }}>
            <TodoList />
          </div>

          {/* Row 4: Companies */}
          <div className="bento-card bento-card--medium bento-card--tertiary" style={{ gridColumn: 'span 8' }}>
            <div className="bento-card-header">
              <div className="bento-card-icon">🏢</div>
              <h3>Top Companies</h3>
            </div>
            <div className="bento-card-content">
              <div className="top-companies">
                {getTopCompanies().slice(0, 3).length > 0 ? (
                  getTopCompanies().slice(0, 3).map(([company, count]) => (
                    <div key={company} className="company-item">
                      <div className="company-name">{company}</div>
                      <div className="company-count">{count}</div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">No data yet</div>
                )}
              </div>
            </div>
          </div>

          {/* Row 4: Quick Actions */}
          <div className="bento-card bento-card--actions bento-card--primary" style={{ gridColumn: 'span 12' }}>
            <div className="quick-actions-horizontal">
              <button className="quick-action-btn" onClick={() => navigate("/create")}>
                <span className="quick-action-icon">➕</span>
                <span className="quick-action-text">Add Application</span>
              </button>
              <button className="quick-action-btn" onClick={() => navigate("/jobs")}>
                <span className="quick-action-icon">📋</span>
                <span className="quick-action-text">View All Jobs</span>
              </button>
              <button className="quick-action-btn" onClick={() => navigate("/dashboard")}>
                <span className="quick-action-icon">🔄</span>
                <span className="quick-action-text">Refresh Stats</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
