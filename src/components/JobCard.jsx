function JobCard({ job, onDelete, onStatusChange }) {
  const formatDate = (d) => {
    if (!d) return "—";
    const date = new Date(d);
    if (Number.isNaN(date.getTime())) return d; // if already formatted
    return date.toLocaleDateString();
  };

  return (
    <div className="job-card">
      <div className="job-card-top">
        <h3 className="job-company">{job.title}</h3>
        <span className={`status-badge ${job.status}`}>{job.status}</span>
      </div>

      <p className="job-role">{job.description}</p>

      <div className="job-meta">
        <div><span className="meta-label">Location:</span> {job.location || "—"}</div>
        <div><span className="meta-label">Applied:</span> {formatDate(job.dateApplied)}</div>
      </div>

      <div className="job-actions">
        <select
          className="status-select"
          value={job.status}
          onChange={(e) => onStatusChange(job._id, e.target.value)}
        >
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
          <option value="Ghosted">Ghosted</option>
          <option value="Filled">Filled</option>
        </select>

        <button className="danger-btn" onClick={() => onDelete(job._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default JobCard;
