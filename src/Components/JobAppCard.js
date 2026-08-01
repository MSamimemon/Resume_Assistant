import React, { useState } from "react";

const JobAppCard = ({app , updatejobapp , deletejobapp}) => {
    const [status, setstatus] = useState(app.status);
    const [notes, setnotes] = useState(app.notes);
    const handleUpdate=()=>{
        updatejobapp(app._id,app.resume , app.jobdesc, status,notes);
    }
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5>{app.jobdesc?.title}</h5>

        <p className="text-muted">{app.jobdesc?.company}</p>

        <div className="mb-3">
          <label>Status</label>

          <select
            className="form-select"
            value={status}
            onChange={(e) => setstatus(e.target.value)}
          >
            <option value ="applied">Applied</option>
            <option value ="interview">Interview</option>
            <option value ="rejected">Rejected</option>
            <option value ="offer">Offer</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Notes</label>

          <textarea
            className="form-control"
            value={notes}
            onChange={(e) => setnotes(e.target.value)}
          />
        </div>

        <button className="btn btn-success me-2" onClick={handleUpdate}>
          Update
        </button>

        <button
          className="btn btn-danger"
          onClick={() => deletejobapp(app._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobAppCard;
