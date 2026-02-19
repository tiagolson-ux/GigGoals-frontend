function JobCard({ job, onDelete, onStatusUpdate }) {
  const statusColors = {
    "Applied": "var(--primary)",
    "Interviewing": "var(--warning)",
    "Offer": "var(--success)",
    "Rejected": "var(--danger)",
    "Ghosted": "var(--text-muted)",
    "Filled": "var(--accent)"
  };

  const excitementLabels = {
    1: "Not Excited", 2: "Slightly Interested", 3: "Neutral", 4: "Interested", 5: "Very Excited"
  };

  const excitementColors = {
    1: "var(--danger)", 2: "var(--warning)", 3: "var(--info)", 4: "var(--success)", 5: "var(--success)"
  };

  const statusIcons = {
    "Applied": "📤", "Interviewing": "📅", "Offer": "🎉", "Rejected": "❌", "Ghosted": "👻", "Filled": "✅"
  };

  return (
    <div className="job-card">
      <div className="job-header">
        <div>
          <h3>{job.title}</h3>
          <div className="job-company">
            <strong>{job.company}</strong>
            {job.location && <span className="location">📍 {job.location}</span>}
          </div>
        </div>
        <button 
          onClick={() => onDelete(job._id)}
          className="delete-btn"
          title="Delete application"
        >
          🗑️
        </button>
      </div>
      
      {job.description && (
        <p className="job-description">{job.description}</p>
      )}
      
      <div className="job-details">
        <div className="job-status-control">
          <label>Status</label>
          <div className="select-wrapper">
            <span className="status-icon">{statusIcons[job.status]}</span>
            <select 
              value={job.status} 
              onChange={(e) => onStatusUpdate(job._id, e.target.value)}
              style={{ borderColor: statusColors[job.status] }}
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
              <option value="Ghosted">Ghosted</option>
              <option value="Filled">Filled</option>
            </select>
          </div>
        </div>
        
        <div className="job-excitement-control">
          <label>Excitement</label>
          <div className="excitement-badge" style={{ 
            backgroundColor: `color-mix(in srgb, ${excitementColors[job.excitement]} 15%, transparent)`,
            color: excitementColors[job.excitement]
          }}>
            {excitementLabels[job.excitement]} • {job.excitement}/5
          </div>
        </div>
      </div>
      
      <div className="job-meta-grid">
        {job.salary && <div className="meta-item">💰 {job.salary}</div>}
        {job.contactName && <div className="meta-item">👤 {job.contactName}</div>}
        {job.contactEmail && <div className="meta-item">📧 {job.contactEmail}</div>}
        <div className="meta-item date">📅 {new Date(job.dateApplied).toLocaleDateString()}</div>
      </div>
      
      {(job.jobUrl || job.resumeLink || job.coverLetterLink) && (
        <div className="job-links">
          {job.jobUrl && <a href={job.jobUrl} target="_blank" rel="noopener noreferrer" className="link-btn">Job Posting</a>}
          {job.resumeLink && <a href={job.resumeLink} target="_blank" rel="noopener noreferrer" className="link-btn">Resume</a>}
          {job.coverLetterLink && <a href={job.coverLetterLink} target="_blank" rel="noopener noreferrer" className="link-btn">Cover Letter</a>}
        </div>
      )}
    </div>
  );
}

export default JobCard;
