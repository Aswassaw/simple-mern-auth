import React, { useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const [redirect, setRedirect] = useState(false);
  const token = localStorage.getItem("token");

  const onSubmitForm = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/login", {
        username,
        password,
      })
      .then((result) => {
        setAlert(result.data.message);
        setError("");

        if (result) {
          localStorage.setItem("token", result.data.token);
        }

        setRedirect(true);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div>
      {token && <Redirect to="/dashboard" />}
      {redirect && <Redirect to="/dashboard" />}
      <div style={{ marginTop: "15vh" }}>
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
                  <h2>Form Login</h2>
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
                      Login
                    </button>

                    <div className="col-md-12 mt-3">
                      <p>
                        Lupa Password? <Link to="/forgotpassword">Reset</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
