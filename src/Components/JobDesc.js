import React, { useContext, useState , useEffect} from 'react';
import jobdescContext from '../Context/JobDescription/jobdescContext';
import { useNavigate } from 'react-router-dom';
import JobDescCard from './JobDescCard'

const JobDesc = (props) => {
    const navigate = useNavigate();
    const [jobdescs, setjobdescs] = useState({title:"",company:"",text:""});
    const context = useContext(jobdescContext);
    const { getjobdesc, addjobdes, deletejobdes, jobdesc }=context;
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getjobdesc();
        } else {
            props.showalert("Please login first to continue.", "danger");
            navigate('/login');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await addjobdes(jobdescs.title, jobdescs.company, jobdescs.text);
          await getjobdesc();
          setjobdescs({ title: "", company: "", text: "" });
          props.showalert("Job Description Added Successfully..","success");
        } catch (error) {
          props.showalert("Failed To Add Job Description","danger")
        }
    };
    const handleDelete = async (id) => {
        try {
            await deletejobdes(id);
            props.showalert("Job Description Deleted Successfully..","success");
        } catch (error) {
            props.showalert("Failed to Delete Job Description","danger");
        }
    }
    const onChange=(e)=>{
        setjobdescs({...jobdescs,[e.target.name]: e.target.value})
    }
  return (
     <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "100vh", backgroundColor: "#f5f6f8" }}>
      <div className="card shadow-sm border-0" style={{ width: "100%", maxWidth: "560px", borderRadius: "10px" }}>
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <h4 className="fw-semibold mb-1">Add a Job Description</h4>
            <p className="text-muted small mb-0">Paste the job posting details</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label fw-medium">Job Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={jobdescs.title}
                placeholder="e.g. Full Stack Developer"
                onChange={onChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="company" className="form-label fw-medium">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                className="form-control"
                value={jobdescs.company}
                placeholder="e.g. 10Pearls"
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="text" className="form-label fw-medium">Job Description</label>
              <textarea
                id="text"
                name="text"
                className="form-control"
                rows="8"
                value={jobdescs.text}
                placeholder="Paste the job description here..."
                onChange={onChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 fw-medium mt-2">
              Add Job Description
            </button>
          </form>

          {jobdesc && jobdesc.length > 0 && (
            <div className="mt-4">
              <h6 className="fw-semibold mb-3">Your Job Descriptions</h6>
              {jobdesc.map((j) => (
                <JobDescCard key={j._id} jobdesc={j} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDesc;
