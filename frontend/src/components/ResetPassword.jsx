import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const location = useLocation()

  const onSubmitForm = (e) => {
    e.preventDefault();

    const token = location.pathname.split('/')[2];

    if (password === passwordConfirm) {
      axios
        .put("http://localhost:4000/resetpassword", {
          token,
          password,
        })
        .then((result) => {
          setAlert(result.data.message);
          setError("");
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    } else {
      setError("Password dan Konfirmasi Password tidak sama.");
    }
  };

  return (
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
                <h2>Reset Password</h2>
                <hr />
                <form onSubmit={onSubmitForm}>
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
                  <div className="form-group mt-3">
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Password Confirm"
                      className="form-control"
                      value={passwordConfirm}
                      onChange={(e) => {
                        setPasswordConfirm(e.target.value);
                      }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">
                    Send
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

export default ResetPassword;
