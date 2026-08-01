
import React from "react";
import { Link } from "react-router-dom";
import "../Styling/Pages.css";

const About = () => (
  <div className="ra-page">
    <section className="ra-banner">
      <div className="ra-banner-inner">
        <span className="ra-section-kicker">About the application</span>
        <h3>Designed to make your job search easier.</h3>
        <p>
          Resume Assistant brings resume management, job descriptions,
          application tracking, and ATS analysis into one focused workspace.
        </p>
      </div>
    </section>

    <section className="ra-body">
      <div className="ra-body-inner">
        <p>
          Resume Assistant was created with a simple goal: reduce the friction
          of managing a modern job search. Instead of losing track of resume
          versions, job requirements, or application status, users can keep
          the entire workflow connected in one application.
        </p>
        
        <h3 className="mt-5 mb-3">Technology stack</h3>
        <div className="ra-stack">
          {["React", "Node.js", "Express", "MongoDB", "JWT Authentication", "Bootstrap"].map((item) => (
            <span className="ra-chip" key={item}>{item}</span>
          ))}
        </div>

        <h3 className="mb-3">What the application provides</h3>
        <ul className="ra-roadmap">
          <li><span className="ra-status ra-status-done">READY</span> Secure user authentication</li>
          <li><span className="ra-status ra-status-done">READY</span> Resume upload and management</li>
          <li><span className="ra-status ra-status-done">READY</span> Job description management</li>
          <li><span className="ra-status ra-status-done">READY</span> Job application tracking</li>
          <li><span className="ra-status ra-status-done">READY</span> ATS analysis and application insights</li>
        </ul>

        <div className="mt-5">
          <Link className="ra-btn ra-btn-primary" to="/">Back to home</Link>
        </div>
      </div>
    </section>
  </div>
);

export default About;
