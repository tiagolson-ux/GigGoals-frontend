import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockApi from "../services/mockApi";
import Navbar from "../components/Navbar";

function CreateGig() {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    description: "",
    jobUrl: "",
    salary: "",
    location: "",
    contactName: "",
    contactEmail: "",
    resumeLink: "",
    coverLetterLink: "",
    excitement: 3,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await mockApi.post("/gigs", formData);
      navigate("/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create job application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-gig-page">
      <Navbar />
      <div className="create-gig-container">
        <h1>New Opportunity</h1>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="create-gig-form">
          <div className="form-section">
            <h3>Role Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Company*</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Google"
                />
              </div>

              <div className="form-group">
                <label>Job Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Paste the job description or write your notes here..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Salary Range</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. $120k - $150k"
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Remote / New York"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Application Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Job URL</label>
                <input
                  type="url"
                  name="jobUrl"
                  value={formData.jobUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>

              <div className="form-group">
                <label>Excitement Level</label>
                <div className="excitement-select-wrapper">
                  <select
                    name="excitement"
                    value={formData.excitement}
                    onChange={handleChange}
                  >
                    <option value={1}>1 - Not Excited</option>
                    <option value={2}>2 - Slightly Interested</option>
                    <option value={3}>3 - Neutral</option>
                    <option value={4}>4 - Interested</option>
                    <option value={5}>5 - Very Excited</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Contact Info (Optional)</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Contact Name</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="Recruiter or Hiring Manager"
                />
              </div>

              <div className="form-group">
                <label>Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="email@company.com"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Documents</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Resume Link</label>
                <input
                  type="url"
                  name="resumeLink"
                  value={formData.resumeLink}
                  onChange={handleChange}
                  placeholder="Link to your resume"
                />
              </div>

              <div className="form-group">
                <label>Cover Letter Link</label>
                <input
                  type="url"
                  name="coverLetterLink"
                  value={formData.coverLetterLink}
                  onChange={handleChange}
                  placeholder="Link to your cover letter"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={() => navigate("/jobs")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGig;
