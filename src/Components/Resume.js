import React, { useEffect, useContext, useState } from "react";
import resumeContext from "../Context/Resume/resumeContext";
import ResumeCard from "./ResumeCard";
import { useNavigate } from "react-router-dom";

const Resume = (props) => {
  const navigate = useNavigate();
  const [resumes, setresumes] = useState({
    text: "",
    resumepath: "",
    parsedData: null,
  });
  const [activeTab, setActiveTab] = useState("");
  const [selectedFile, setselectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const context = useContext(resumeContext);
  const { getresume, addresume, deleteresume, uploadresume, resume } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getresume();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumes.text.trim()) return;
    await addresume(resumes.text, resumes.resumepath, resumes.parsedData);
    await getresume();
    setresumes({ text: "", resumepath: "", parsedData: null });
  };

  const onChange = (e) => {
    setresumes({ ...resumes, [e.target.name]: e.target.value });
  };
  const onFileChange = (e) => {
    setselectedFile(e.target.files[0]);
  };
  const handleFileUpload = async (e) => {
    if (!resumes.text.trim()) {
      props.showalert("Please enter a resume title.","secondary");
      return;
    }
    if (!selectedFile) {
      props.showalert("Please choose a PDF file.","secondary");
      return;
    }
    try {
      setUploading(true);
      const response = await uploadresume(resumes.text, selectedFile);
      console.log(response);
      await getresume();
      setresumes({ text: "", resumepath: "", parsedData: null });
      setselectedFile(null);
      props.showalert("Resume uploaded successfully!","success");
    } catch (error) {
      console.error(error);
      props.showalert("Upload failed.","danger");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      style={{ minHeight: "100vh", backgroundColor: "#f5f6f8" }}
    >

      <div
        className="card shadow-sm border-0"
        style={{ width: "100%", maxWidth: "560px", borderRadius: "10px" }}
      >
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <h4 className="fw-semibold mb-1">Add Your Resume</h4>
            <p className="text-muted small mb-0">
              Upload a File or Paste your resume text manually
            </p>
          </div>

          <ul
            className="nav nav-pills nav-justified mb-4 bg-light rounded p-1"
            role="tablist"
          >
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link w-100 ${activeTab === "upload" ? "active" : ""}`}
                onClick={() => setActiveTab("upload")}
              >
                Upload File
              </button>
            </li>
            <li className="nav-item mx-3">
              <button
                type="button"
                className={`nav-link w-100 ${activeTab === "manual" ? "active" : ""}`}
                onClick={() => setActiveTab("manual")}
              >
                Add Manually
              </button>
            </li>
          </ul>

          {activeTab === "upload" && (
            <div className="mb-3">
              <label htmlFor="resumepath" className="form-label fw-medium">
                Resume file
              </label>
              <label
                htmlFor="resume"
                className="d-flex flex-column align-items-center justify-content-center text-center boarder boarder-2 rounded p-4"
                style={{
                  cursor: "pointer",
                  borderStyle: "dashed",
                  backgroundColor: "#fafafa",
                }}
              >
                <div className="mb-3">
                  <label className="form-label fw-medium">Resume Title</label>

                  <input
                    type="text"
                    className="form-control"
                    name="text"
                    value={resumes.text}
                    onChange={onChange}
                    placeholder="Example: Frontend Developer Resume"
                  />
                </div>
                <span className="fw-medium">
                  {selectedFile ? selectedFile.name : "Click to select a file"}
                </span>
                <span className="text-muted small mt-1">
                  PDF, DOC or DOCX — up to 5MB
                </span>
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                className="d-none"
                accept=".pdf,.doc,.docx"
                onChange={onFileChange}
              />

              {selectedFile && (
                <button
                  type="button"
                  className="btn btn-primary w-100 mt-3"
                  onClick={handleFileUpload}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload this file"}
                </button>
              )}
            </div>
          )}

          {activeTab === "manual" && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="text" className="form-label fw-medium">
                  Resume text
                </label>
                <textarea
                  id="text"
                  name="text"
                  className="form-control"
                  rows="8"
                  value={resumes.text}
                  placeholder="Paste or type your resume content here..."
                  onChange={onChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-medium mt-2"
              >
                Add Resume
              </button>
            </form>
          )}
          {resume && resume.length > 0 && (
            <div className="mt-4">
              <h6 className="fw-semibold mb-3">Your Resumes</h6>
              {resume.map((r) => (
                <ResumeCard key={r._id} resume={r} onDelete={deleteresume} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;
