import About from "./Components/About";
import Contact from "./Components/Contact";
import Navbar from "./Components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Resume from "./Components/Resume";
import Login from "./Components/Login";
import Singup from "./Components/Singup";
import JobDesc from "./Components/JobDesc";
import JobApp from "./Components/JobApp";
import Home from "./Components/Home";
import ATSAnalyzer from "./Components/AtsAnalyzer";
import Analytics from "./Components/Analytics";
import Dashboard from "./Components/Dashboard";
import Alert from "./Components/Alert";
import { useState } from "react";


function App() {
  const [alert, setalert] = useState(null);

  const showalert=(Message, type)=>{
      setalert({
        msg:Message,
        type:type
      })
      setTimeout(()=>{
        setalert(null);
      }, 3000);
    }
  return (
    <>     
              <Router>
                <Navbar/>
                <Alert alert={alert} />
                <div className="container">
                <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/dashboard" element={<Dashboard/>} />
                  <Route path="/Contact" element={<Contact/>} />
                  <Route path="/Resume" element={<Resume showalert={showalert}/>}  />
                  <Route path="/JobDescription" element={<JobDesc showalert={showalert}/>}  />
                  <Route path="/AtsAnalyzer" element={<ATSAnalyzer/>} />
                  <Route path="/analytics" element={<Analytics/>} />
                  <Route path="/JobApplication" element={<JobApp showalert={showalert}/>}  />
                  <Route path="/About" element={<About/>} />
                  <Route path="/login" element={<Login showalert={showalert}/>}  />
                  <Route path="/signup" element={<Singup showalert={showalert}/>}/>
                </Routes>
                </div>
              </Router>
    </>
  );
}

export default App;

