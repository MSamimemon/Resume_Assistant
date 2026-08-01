import React from "react";

const JobDescCard = ({ jobdesc, onDelete }) => {
  return (
    <div className="card mb-2 border-0 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <p className="mb-1 fw-medium text-truncate" style={{ maxWidth: "380px" }}>
            {jobdesc.title} {jobdesc.company ? `— ${jobdesc.company}` : ""}
          </p>
          <small className="text-muted">
            Added {new Date(jobdesc.createdAt).toLocaleDateString()}
          </small>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={() => onDelete(jobdesc._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobDescCard;