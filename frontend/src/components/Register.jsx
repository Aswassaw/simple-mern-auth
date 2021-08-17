import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const token = localStorage.getItem("token");

  const onSubmitForm = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/register", {
        username,
        email,
        password,
      })
      .then((result) => {
        setAlert(result.data.message);
        setError("");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div style={{ marginTop: "15vh" }}>
      {token && <Redirect to="/dashboard" />}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              <div className="card-body">
                {alert ? (
                  <div className="alert alert-success">{alert}</div>
                ) : null}
                {error ? (
                  <div className="alert alert-danger">{error}</div>
                ) : null}
                <h2>Form Register</h2>
                <hr />
                <form onSubmit={onSubmitForm}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      placeholder="Username"
                      className="form-control"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      placeholder="Email"
                      className="form-control"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
