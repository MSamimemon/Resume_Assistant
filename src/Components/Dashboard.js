import React, { useContext, useEffect, useState } from "react";
import ResumeContext from "../Context/Resume/resumeContext";
import JobdescContext from "../Context/JobDescription/jobdescContext";
import AtsContext from "../Context/Ats/atsContext";

const Dashboard = () => {
  const resumeContext = useContext(ResumeContext);
  const jobdescContext = useContext(JobdescContext);
  const atsContext = useContext(AtsContext);

  const { resume, getresume } = resumeContext;
  const { jobdesc, getjobdesc } = jobdescContext;

 
  const { atsHistory, getAtsHistory } = atsContext || {};

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        await Promise.all([
          getresume(),
          getjobdesc(),
          getAtsHistory ? getAtsHistory() : Promise.resolve(),
        ]);
      } catch (error) {
        console.error("Dashboard loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const totalResumes = resume?.length || 0;
  const totalJobDescriptions = jobdesc?.length || 0;
  const totalATS = atsHistory?.length || 0;

  const averageScore =
    totalATS > 0
      ? Math.round(
          atsHistory.reduce(
            (total, item) => total + (item.score || item.atsScore || 0),
            0,
          ) / totalATS,
        )
      : 0;

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
          <p className="mt-3 text-muted">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h2 className="fw-bold">Dashboard</h2>
        <p className="text-muted">
          Welcome back! Here's an overview of your Resume Assistant.
        </p>
      </div>
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">Total Resumes</p>

                  <h2 className="fw-bold mb-0">{totalResumes}</h2>
                </div>

                <div className="fs-1">📄</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">Job Descriptions</p>

                  <h2 className="fw-bold mb-0">{totalJobDescriptions}</h2>
                </div>

                <div className="fs-1">💼</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">ATS Analyses</p>

                  <h2 className="fw-bold mb-0">{totalATS}</h2>
                </div>

                <div className="fs-1">🎯</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">Average ATS Score</p>

                  <h2 className="fw-bold mb-0">{averageScore}%</h2>
                </div>

                <div className="fs-1">⭐</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="fw-bold mb-0">Recent Resumes</h5>
            </div>

            <div className="card-body">
              {totalResumes === 0 ? (
                <p className="text-muted mb-0">No resumes found.</p>
              ) : (
                resume
                  .slice(-5)
                  .reverse()
                  .map((item) => (
                    <div
                      key={item._id}
                      className="d-flex justify-content-between align-items-center border-bottom py-3"
                    >
                      <div>
                        <h6 className="mb-1">
                          {item.text || "Untitled Resume"}
                        </h6>

                        <small className="text-muted">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString()
                            : "Recently added"}
                        </small>
                      </div>

                      <span className="badge bg-primary">Resume</span>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="fw-bold mb-0">Recent Job Descriptions</h5>
            </div>

            <div className="card-body">
              {totalJobDescriptions === 0 ? (
                <p className="text-muted mb-0">No job descriptions found.</p>
              ) : (
                jobdesc
                  .slice(-5)
                  .reverse()
                  .map((item) => (
                    <div
                      key={item._id}
                      className="d-flex justify-content-between align-items-center border-bottom py-3"
                    >
                      <div>
                        <h6 className="mb-1">{item.title}</h6>

                        <small className="text-muted">
                          {item.company || "Company not specified"}
                        </small>
                      </div>

                      <span className="badge bg-success">Job</span>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
