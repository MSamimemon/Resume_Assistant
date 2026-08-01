import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ResumeState from './Context/Resume/resumeState';
import JobdescState from './Context/JobDescription/jobdescState';
import JobappState from './Context/JobApplication/jobappState';
import AtsState from './Context/Ats/atsState';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AtsState>
    <JobappState>
      <ResumeState>
        <JobdescState>
          <App />
        </JobdescState>
      </ResumeState>
    </JobappState>
  </AtsState>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

