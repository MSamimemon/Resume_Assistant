import React, { useContext, useState  , useEffect} from "react";
import ResumeContext from "../Context/Resume/resumeContext";
import JobdescContext from "../Context/JobDescription/jobdescContext";
import AtsContext from "../Context/Ats/atsContext";

const ATSAnalyzer = (props) => {
  const resumeContext = useContext(ResumeContext);
  const jobdescContext = useContext(JobdescContext);
  const atsContext = useContext(AtsContext);

  const { resume , getresume } = resumeContext;
  const { jobdesc , getjobdesc } = jobdescContext;
  const { analyzeATS, loading } = atsContext;

  const [selectedResume, setSelectedResume] = useState("");
  const [selectedJobDesc, setSelectedJobDesc] = useState("");

  const [result, setResult] = useState(null);

  useEffect(() => {
  const loadData = async () => {
    await getresume();
    await getjobdesc();
  };
  loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const handleAnalyze = async () => {
    if (!selectedResume || !selectedJobDesc) {
      props.showalert("Please select both Resume and Job Description.","secondary");
      return;
    }

    const response = await analyzeATS(selectedResume, selectedJobDesc);

    if (response.success) {
      setResult(response.analysis);
    } else {
      props.showalert(response.message,"success");
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-header">
          <h3>ATS Resume Analyzer</h3>
        </div>

        <div className="card-body">
          {/* Resume */}

          <div className="mb-3">
            <label className="form-label">Select Resume</label>

            <select
              className="form-select"
              value={selectedResume}
              onChange={(e) => setSelectedResume(e.target.value)}
            >
              <option value="">Select Resume</option>

              {resume.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.text}
                </option>
              ))}
            </select>
          </div>

          {/* Job Description */}

          <div className="mb-3">
            <label className="form-label">Select Job Description</label>

            <select
              className="form-select"
              value={selectedJobDesc}
              onChange={(e) => setSelectedJobDesc(e.target.value)}
            >
              <option value="">Select Job Description</option>

              {jobdesc.map((j) => (
                <option key={j._id} value={j._id}>
                  {j.title}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-primary"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>
      </div>

      {/* Results */}

      {result && (
        <div className="card shadow mt-4">
          <div className="card-header">
            <h4>ATS Result</h4>
          </div>

          <div className="card-body">
            <h5>ATS Score : {result.atsScore}%</h5>

            <hr />

            <h6>Matched Skills</h6>

            <ul>
              {result.matchedSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>

            <h6>Missing Skills</h6>

            <ul>
              {result.missingSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>

            <h6>Suggestions</h6>

            <ul>
              {result.suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSAnalyzer;
