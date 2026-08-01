import React, { useContext, useEffect } from "react";
import AtsContext from "../Context/Ats/atsContext";

const Analytics = () => {
  const { atsHistory = [], getAtsHistory } = useContext(AtsContext);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        await getAtsHistory();
      } catch (error) {
        console.error("Failed to load ATS history:", error);
      }
    };

    loadHistory();
  }, [getAtsHistory]);

  const history = Array.isArray(atsHistory) ? atsHistory : [];
  const totalAnalyses = history.length;
  const scores = history.map((item) => Number(item?.atsScore) || 0);
  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce((sum, score) => sum + score, 0) / scores.length,
        )
      : 0;
  const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
  const lowestScore = scores.length > 0 ? Math.min(...scores) : 0;
  const matchedSkills = {};
  const missingSkills = {};
  history.forEach((item) => {
    const matched = Array.isArray(item?.matchedSkills)
      ? item.matchedSkills
      : [];

    const missing = Array.isArray(item?.missingSkills)
      ? item.missingSkills
      : [];

    matched.forEach((skill) => {
      if (!skill) return;

      matchedSkills[skill] = (matchedSkills[skill] || 0) + 1;
    });

    missing.forEach((skill) => {
      if (!skill) return;

      missingSkills[skill] = (missingSkills[skill] || 0) + 1;
    });
  });

  const topMatchedSkills = Object.entries(matchedSkills)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const topMissingSkills = Object.entries(missingSkills)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const getScoreClass = (score) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-danger";
  };

  const getProgressClass = (score) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-warning";
    return "bg-danger";
  };

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">📊 Analytics</h2>

        <p className="text-muted mb-0">
          Analyze your ATS performance and identify areas for improvement.
        </p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1">Total Analyses</p>

                  <h2 className="fw-bold mb-0">{totalAnalyses}</h2>
                </div>

                <span className="fs-2">🎯</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1">Average ATS Score</p>

                  <h2 className={`fw-bold mb-0 ${getScoreClass(averageScore)}`}>
                    {averageScore}%
                  </h2>
                </div>

                <span className="fs-2">📊</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1">Highest Score</p>

                  <h2 className="fw-bold text-success mb-0">{highestScore}%</h2>
                </div>

                <span className="fs-2">🏆</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1">Lowest Score</p>

                  <h2 className="fw-bold text-danger mb-0">{lowestScore}%</h2>
                </div>

                <span className="fs-2">📉</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white py-3">
          <h5 className="fw-bold mb-0">📈 ATS Score History</h5>
        </div>

        <div className="card-body">
          {history.length === 0 ? (
            <div className="text-center py-4">
              <div className="display-5 mb-2">📊</div>

              <h6 className="fw-bold">No ATS analyses yet</h6>

              <p className="text-muted mb-0">
                Analyze a resume against a job description to see your ATS
                history here.
              </p>
            </div>
          ) : (
            history.map((item, index) => {
              const score = Number(item?.atsScore) || 0;

              return (
                <div key={item?._id || index} className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium text-truncate">
                      {item?.resume?.text ||
                        item?.resume?.title ||
                        `Resume ${index + 1}`}
                    </span>

                    <strong className={getScoreClass(score)}>{score}%</strong>
                  </div>

                  <div className="progress" style={{ height: "10px" }}>
                    <div
                      className={`progress-bar ${getProgressClass(score)}`}
                      role="progressbar"
                      style={{
                        width: `${Math.min(Math.max(score, 0), 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white py-3">
              <h5 className="fw-bold mb-0 text-success">
                ✅ Most Matched Skills
              </h5>
            </div>

            <div className="card-body">
              {topMatchedSkills.length === 0 ? (
                <p className="text-muted mb-0">No matched skills yet.</p>
              ) : (
                topMatchedSkills.map(([skill, count]) => (
                  <div
                    key={skill}
                    className="d-flex justify-content-between align-items-center border-bottom py-3"
                  >
                    <span>{skill}</span>

                    <span className="badge bg-success rounded-pill">
                      {count}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white py-3">
              <h5 className="fw-bold mb-0 text-danger">
                ❌ Most Missing Skills
              </h5>
            </div>

            <div className="card-body">
              {topMissingSkills.length === 0 ? (
                <p className="text-muted mb-0">No missing skills yet.</p>
              ) : (
                topMissingSkills.map(([skill, count]) => (
                  <div
                    key={skill}
                    className="d-flex justify-content-between align-items-center border-bottom py-3"
                  >
                    <span>{skill}</span>

                    <span className="badge bg-danger rounded-pill">
                      {count}
                    </span>
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

export default Analytics;
