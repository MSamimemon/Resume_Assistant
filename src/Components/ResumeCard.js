import React ,{useContext, useRef, useState} from "react";
import resumeContext from '../Context/Resume/resumeContext';

const ResumeCard = ({ resume, onDelete ,showalert  }) => {
  const rescontext = useContext(resumeContext);
  const {getresume, updateresume}=rescontext;
  const fileInputRef=useRef(null);
  const [replacing, setreplacing] = useState(false);

  const handlePreview=()=>{
    if (!resume.resumepath){
      showalert("No Resume File Avaliable...","danger");
      return;
    }
    const filepath=resume.resumepath.replace(/\\/g, "/");
    const url = `http://localhost:5000/${filepath}`;
    window.open(url,"_blank"); 
  }
  const handleDownload=()=>{
    if (!resume.resumepath){
      showalert("No Resume File Avaliable...","danger");
      return;
    }
    const filePath= resume.resumepath.replace(/\\/g,"/");
    const url =`http://localhost:5000/${filePath}`
    const link = document.createElement('a');
    link.href=url;
    link.download="";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  const handleReplaceClick=()=>{
    fileInputRef.current.click();
    
  }
  const handleReplace=async(e)=>{
    const file= e.target.files[0];
    if (!file) {
      return;
    }
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      showalert("Only PDF files are allowed.","secondary");
      e.target.value = "";
      return;
    }


    if (file.size > 50 * 1024 * 1024) {
      showalert("File size must be less than 5MB.","secondary");
      e.target.value = "";
      return;
    }

    try {
      setreplacing(true);

      const response = await updateresume(
        resume._id,
        resume.text,
        file
      );

      console.log("Updated resume:", response);

      if (response.success) {
        await getresume();
        showalert("Resume replaced successfully!","success");
      } else {
        showalert(response.message || "Failed to replace resume.","danger");
      }
    } catch (error) {
      console.error("Replace resume error:", error);
      showalert("Something went wrong while replacing the resume.","danger");
    } finally {
      setreplacing(false);
      e.target.value = "";
    }
  }
  return (
    <div className="card mb-2 border-0 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <p className="mb-1 fw-medium text-truncate" style={{ maxWidth: "380px" }}>
            {resume.text || resume.resumepath || "Untitled resume"}
          </p>
          <small className="text-muted">
            Added {new Date(resume.createdAt).toLocaleDateString()}
          </small>
        </div>
        <div className="d-flex gap-2">
          {resume.resumepath &&(
            <button 
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={handlePreview}
              disabled={replacing}
            > 👁 Preview </button>
          )}

          {resume.resumepath &&(
            <button 
              type="button"
              className="btn btn-sm btn-outline-success"
              onClick={handleDownload}
              disabled={replacing}
            > ⬇ Download </button>
          )}

          <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(resume._id)}
              disabled={replacing}
          > 🗑 Delete</button>

          {resume.resumepath && (
            <>
              <button
                  type="button"
                  className="btn btn-sm btn-outline-warning"
                  onClick={handleReplaceClick}
                  disabled={replacing}>
                    {replacing ? "Replacing...":"✏ Replace"}
                  </button>

              <input
                  type="file"
                  ref={fileInputRef}
                  className="d-none"
                  accept=".pdf,.doc,.docx"
                  onChange={handleReplace} 
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ResumeCard;