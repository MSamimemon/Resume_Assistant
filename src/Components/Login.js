import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = (props) => {
    const host = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const navigate= useNavigate();
    const [credentials, setcredentials] = useState({email:"",password:""});
    const handlesubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/loginuser`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({email:credentials.email, password:credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if (json.success){
            localStorage.setItem('token',json.authtoken);
            navigate('/');
            props.showalert("Login Successfully ! ","success");
        }else {
            props.showalert("Inavlid Credentials","danger");
        }
    }
    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]: e.target.value})
    }
  return (
<div className="bg-red-500 p-10">
       <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg border-0" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Welcome Back</h2>
            <p className="text-muted">Login to continue to Resume Assistant</p>
          </div>

          <form onSubmit={handlesubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                name="email"
                placeholder="name@example.com" value={credentials.email} onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                name="password"
                placeholder="Enter your password" value={credentials.password} onChange={onChange}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
              Login
            </button>

            <p className="text-center text-muted mb-0">
              Don't have an account?{' '}
              <Link to="/signup" className="text-decoration-none fw-semibold">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
