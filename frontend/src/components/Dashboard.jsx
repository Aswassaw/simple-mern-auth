import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import axios from "axios";

function Dashboard() {
  const [redirect, setRedirect] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Jika tidak ada token di localStorage
    if (!token) {
      setRedirect(true);
    }

    axios
      .get("http://localhost:4000/verifyToken", {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        if (!result.data.isValid) {
          setRedirect(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {redirect && <Redirect to="/" />}
      <div className="container">
        <h1>Halaman Dashboard</h1>
      </div>
    </div>
  );
}

export default Dashboard;
