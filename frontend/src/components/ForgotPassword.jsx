import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");

  const onSubmitForm = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:4000/forgotpassword", {
        email,
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
                <h2>Forgot Password</h2>
                <hr />
                <form onSubmit={onSubmitForm}>
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
}

export default ForgotPassword;
