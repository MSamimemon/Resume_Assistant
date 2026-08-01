import React from 'react';
import {Link} from 'react-router-dom'
import { useLocation , useNavigate } from 'react-router-dom';

const Navbar = () => {
  let navigate=useNavigate();
  const handlelogout=()=>{
      localStorage.removeItem('token');
      navigate('/login')
  }
  let location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1c1c1c', borderBottom: '1px solid #2e2e2e' }}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/" style={{ color: '#ffffff', fontWeight: 600 }}>Resume Assistant</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ borderColor: '#3a3a3a' }}>
      <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item dropdown">
          <Link className={`nav-link dropdown-toggle ${location.pathname==='/Features'?"active":""}`} to="/Features" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Features
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/Resume">Resume</Link></li>
            <li><Link className="dropdown-item" to="/JobDescription">Job Description</Link></li>
            <li><Link className="dropdown-item" to="/JobApplication">Job Application</Link></li>
            <li><Link className="dropdown-item" to="/AtsAnalyzer">ATS Analyzer</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/dashboard'?"active":""}`} to="/dashboard" style={{ color: '#c9c9c9' }}>Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/About'?"active":""}`} to="/About" style={{ color: '#c9c9c9' }}>About</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/Contact'? "active":""}`} to="/Contact" style={{ color: '#c9c9c9' }}>Contact</Link>
        </li>  
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/analytics'?"active":""}`} to="/analytics" style={{ color: '#c9c9c9' }}> Analytics </Link>
        </li>    
      </ul>
      {!localStorage.getItem("token")?<form className='d-flex'>
        <Link className="btn btn-outline-primary mx-2" to= "/login">LogIn</Link>
        <Link className="btn btn-outline-primary" to="/signup">SingUp</Link>
      </form>:<button className="btn btn-outline-primary" onClick={handlelogout}>LogOut</button>}
    </div>
  </div>
</nav>
  );
}

export default Navbar;