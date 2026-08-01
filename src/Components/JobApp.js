import React, { useContext, useEffect, useState } from "react";
import jobappContext from "../Context/JobApplication/jobappContext"
import resumeContext from '../Context/Resume/resumeContext';
import jobdescContext from '../Context/JobDescription/jobdescContext'
import { useNavigate } from "react-router-dom";
import JobAppCard from "./JobAppCard";
const JobApp = (props) => {
    const navigate = useNavigate();
    const appcontext = useContext(jobappContext);
    const rescontext = useContext(resumeContext);
    const desccontext = useContext(jobdescContext);
    const [app, setapp] = useState({resume:"",jobdesc:"",status:"applied",notes:""});
    const {jobapp , getjobapp , addjobapp , updatejobapp , deletejobapp}= appcontext
    const {resume, getresume}=rescontext;
    const {jobdesc , getjobdesc}=desccontext;
    const handleSubmit=async(e)=>{
      try{
          e.preventDefault();
          await addjobapp(app.resume,app.jobdesc,app.status,app.notes);
          await getjobapp();
          setapp({
              resume:"",
              jobdesc:"",
              status:"applied",
              notes:""
          });
          props.showalert("Job Application Added Successfully..","success");
        }catch(error){
          props.showalert("Failed to Add Job Application","danger");
        }
    }
      const handleUpdate = async (id, resumeId, jobdescId, status, notes) => {
        try {
            await updatejobapp(id, resumeId, jobdescId, status, notes);
            props.showalert("Job Application Updated Successfully..","success");
        } catch (error) {
            props.showalert("Failed to Update Job Application","danger");
        }
    }

    const handleDelete = async (id) => {
        try {
            await deletejobapp(id);
            props.showalert("Job Application Deleted Successfully..","success");
        } catch (error) {
            props.showalert("Failed to Delete Job Application","danger");
        }
    }
    const onChange=(e)=>{
        setapp({...app,[e.target.name]:e.target.value})
    }
    useEffect(() => {
        if(localStorage.getItem("token")){
            getresume();
            getjobdesc();
            getjobapp();
        }else {
            navigate('/login')
            props.showalert("Login to Acess the Application", "danger");
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="mb-4">Add app</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Resume</label>

              <select
                className="form-select"
                name="resume"
                value={app.resume}
                onChange={onChange}
                required
              >
                <option value="">Select Resume</option>

                {resume.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.text.substring(0, 40)}...
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Job Description</label>

              <select
                className="form-select"
                name="jobdesc"
                value={app.jobdesc}
                onChange={onChange}
                required
              >
                <option value="">Select Job</option>

                {jobdesc.map((j) => (
                  <option key={j._id} value={j._id}>
                    {j.title} - {j.company}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label>Status</label>

              <select
                className="form-select"
                name="status"
                value={app.status}
                onChange={onChange}
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
                <option value="offer">Offer</option>
              </select>
            </div>

            <div className="mb-3">
              <label>Notes</label>

              <textarea
                className="form-control"
                rows="4"
                name="notes"
                value={app.notes}
                onChange={onChange}
              />
            </div>

            <button className="btn btn-primary w-100">Add app</button>
          </form>
        </div>
      </div>

      <hr />

      <h4>Your apps</h4>

      {jobapp.map((japp) => (
        <JobAppCard
          key={japp._id}
          app={japp}
          updatejobapp={handleUpdate}
          deletejobapp={handleDelete}
        />
      ))}
    </div>
  );
};

export default JobApp;
