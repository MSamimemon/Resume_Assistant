import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Singup = (props) => {
  const host =  process.env.REACT_APP_API_URL || "http://localhost:5000";
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    name: "",
    mobileNo: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      props.showalert("Passwords do not match","danger");
      return;
    }

    const response = await fetch(`${host}/api/auth/signuser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        mobileNo: credentials.mobileNo,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showalert("Account Created Sucessfully !", "success");
    } else {
      props.showalert("Invalid Credentials Try Again....", "danger");
    }
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="card shadow-lg border-0"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Create Account</h2>
            <p className="text-muted">Sign up to get started with INoteBook</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="name"
                name="name"
                placeholder="John Doe"
                value={credentials.name}
                onChange={onChange}
                minLength={3}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mobile Number
              </label>
              <input
                type="mobile number"
                className="form-control form-control-lg"
                id="mobileNo"
                name="mobileNo"
                placeholder="Enter your Number"
                value={credentials.mobileNo}
                onChange={onChange}
                minLength={11}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={credentials.email}
                onChange={onChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                name="password"
                placeholder="Create a password"
                value={credentials.password}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="cpassword"
                name="cpassword"
                placeholder="Re-enter your password"
                value={credentials.cpassword}
                onChange={onChange}
                minLength={5}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
              Sign Up
            </button>

            <p className="text-center text-muted mb-0">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none fw-semibold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Singup;
