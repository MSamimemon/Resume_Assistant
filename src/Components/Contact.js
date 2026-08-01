
import React from "react";
import { Link } from "react-router-dom";
import "../Styling/Pages.css";

const CONTACT = {
  name: "Resume Assistant ",
  github: "https://github.com/MSamimemon",
  linkedin: "https://www.linkedin.com/in/muhammad-sami-02a509351/",
  email: "samimemon673@gmail.com",
};

const Contact = () => (
  <div className="ra-page">
    <section className="ra-banner">
      <div className="ra-banner-inner">
        <span className="ra-section-kicker">Contact</span>
        <h1>Let's build better applications.</h1>
        <p>
          Have feedback, found an issue, or want to learn more about Resume Assistant?
          Choose a channel below and get in touch.
        </p>
      </div>
    </section>

    <section className="ra-contact-grid">
      <a className="ra-contact-card" href={CONTACT.github} target="_blank" rel="noopener noreferrer">
        <span className="ra-contact-label">GITHUB</span>
        <span className="ra-contact-value">{CONTACT.github.replace("https://", "")}</span>
      </a>
      <a className="ra-contact-card" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
        <span className="ra-contact-label">LINKEDIN</span>
        <span className="ra-contact-value">{CONTACT.linkedin.replace("https://", "")}</span>
      </a>
      <a className="ra-contact-card" href={`mailto:${CONTACT.email}`}>
        <span className="ra-contact-label">EMAIL</span>
        <span className="ra-contact-value">{CONTACT.email}</span>
      </a>
    </section>

    <section className="ra-body">
      <div className="ra-body-inner text-center">
        <h3>Thanks for checking out Resume Assistant.</h3>
        <Link className="ra-btn ra-btn-primary mt-2" to="/">Return to homepage</Link>
      </div>
    </section>
  </div>
);

export default Contact;
