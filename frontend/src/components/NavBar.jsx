import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function NavBar() {
  const [login, setLogin] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Jika tidak ada token di localStorage
    if (!token) {
      setLogin(false);
    }

    axios
      .get("http://localhost:4000/verifyToken", {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        if (result.data.isValid) {
          setLogin(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="http://localhost:3000/">
          MERN Auth
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {!login ? (
              <Fragment>
                <li className="nav-item">
                  <NavLink
                    exact
                    activeClassName="active"
                    to="/"
                    className="nav-link"
                    aria-current="page"
                    href="#"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    to="/register"
                    className="nav-link"
                    aria-current="page"
                    href="#"
                  >
                    Register
                  </NavLink>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="nav-item">
                  <NavLink
                    exact
                    activeClassName="active"
                    to="/dashboard"
                    className="nav-link"
                    aria-current="page"
                    href="#"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    activeClassName="active"
                    to="/logout"
                    className="nav-link"
                    aria-current="page"
                    href="#"
                  >
                    Logout
                  </NavLink>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
