
import React from "react";
import { Link } from "react-router-dom";
import "../Styling/Pages.css";

const FeatureIcon = ({ children }) => (
  <div className="ra-feature-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  </div>
);

const Home = () => {
  return (
    <div className="ra-page">
      <section className="ra-hero" id="home">
        <div className="ra-hero-inner">
          <div className="ra-hero-copy">
            <span className="ra-eyebrow">Resume Assistant</span>
            <h1 className="ra-hero-title">
              Build better applications. <span className="ra-highlight">Apply with confidence.</span>
            </h1>
            <p className="ra-hero-sub">
              Resume Assistant brings your resumes, job descriptions, applications,
              and ATS analysis together in one professional workspace.
            </p>
            <div className="ra-hero-cta">
              <Link className="ra-btn ra-btn-primary" to="/signup">Create free account</Link>
              <Link className="ra-btn ra-btn-ghost" to="/login">Sign in</Link>
            </div>
          </div>

          <div className="ra-match-visual" aria-hidden="true">
            <div className="ra-match-card ra-match-resume">
              <span className="ra-match-label">YOUR RESUME</span>
              <div className="ra-match-line" style={{ width: "82%" }} />
              <div className="ra-match-line" style={{ width: "61%" }} />
              <div className="ra-match-line" style={{ width: "72%" }} />
              <div className="ra-match-line" style={{ width: "48%" }} />
            </div>
            <div className="ra-match-connector"><span className="ra-match-score">86%</span></div>
            <div className="ra-match-card ra-match-job">
              <span className="ra-match-label">JOB DESCRIPTION</span>
              <div className="ra-match-line" style={{ width: "70%" }} />
              <div className="ra-match-line" style={{ width: "85%" }} />
              <div className="ra-match-line" style={{ width: "55%" }} />
              <div className="ra-match-line" style={{ width: "74%" }} />
            </div>
          </div>
        </div>
      </section>

      <section className="ra-features" id="features">
        <div className="ra-section-inner">
          <span className="ra-section-kicker">Everything in one place</span>
          <h2 className="ra-section-title">A smarter workspace for your job search</h2>
          <p className="ra-section-sub">
            Organize the complete application process instead of juggling files,
            job links, notes, and scores across different tools.
          </p>

          <div className="ra-feature-grid">
            <div className="ra-feature-card ra-feature-wide">
              <FeatureIcon>
                <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                <path d="M14 3v4h4M9 12h6M9 15.5h6M9 8.5h3" />
              </FeatureIcon>
              <h3>Manage your resumes</h3>
              <p>Upload, store, update, and keep different resume versions organized and ready for the right opportunity.</p>
            </div>

            <div className="ra-feature-card">
              <FeatureIcon>
                <path d="M6 3h9l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                <path d="M9 10.5h6M9 14h4" />
              </FeatureIcon>
              <h3>Save job descriptions</h3>
              <p>Keep important job requirements accessible so useful postings do not disappear before you apply.</p>
            </div>

            <div className="ra-feature-card">
              <FeatureIcon>
                <path d="M9 6l2 2 4-4M13 4h7M9 12l2 2 4-4M13 12h7M9 18l2 2 4-4M13 20h7" />
              </FeatureIcon>
              <h3>Track applications</h3>
              <p>Connect applications with the resume and job description you used, then follow each status.</p>
            </div>

            <div className="ra-feature-card ra-feature-wide">
              <div className="ra-feature-top">
                <FeatureIcon>
                  <circle cx="12" cy="12" r="8" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="12" cy="12" r="0.6" fill="currentColor" />
                </FeatureIcon>
                <span className="ra-badge-soon">ATS</span>
              </div>
              <h3>Analyze your resume fit</h3>
              <p>Compare a resume with a target job and use ATS insights to understand where your application can improve.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ra-section ra-home-about" id="about">
        <div className="ra-section-inner">
          <div className="ra-home-about-grid">
            <div className="ra-home-about-copy">
              <span className="ra-section-kicker">About Resume Assistant</span>
              <h2 className="ra-section-title">One workflow from resume to application.</h2>
              <p>
                Resume Assistant is a MERN-based web application designed to make
                the job-search process more organized and measurable.
              </p>
              <p>
                Instead of keeping resumes, job posts, applications, and analysis
                in separate places, everything is connected inside one workspace.
              </p>
              <Link className="ra-btn ra-btn-primary mt-2" to="/about">Learn more about the project</Link>
            </div>

            <div className="ra-mini-card">
              <div className="ra-mini-grid">
                <div><strong>01</strong><span>Resume management</span></div>
                <div><strong>02</strong><span>Job tracking</span></div>
                <div><strong>03</strong><span>Application history</span></div>
                <div><strong>04</strong><span>ATS insights</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ra-section ra-contact-preview" id="contact">
        <div className="ra-section-inner">
          <div className="ra-contact-preview-grid">
            <div>
              <span className="ra-section-kicker">Have a question?</span>
              <h2 className="ra-section-title">Let's connect.</h2>
              <p className="ra-section-sub mb-0">
                Want to discuss the project, report an issue, or explore the code?
                Use the contact page to get in touch.
              </p>
            </div>
            <div className="ra-contact-preview-links">
              <Link className="ra-contact-pill" to="/contact">Contact page →</Link>
              <a className="ra-contact-pill" href="mailto:you@example.com">Email →</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
