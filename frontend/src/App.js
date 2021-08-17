import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Logout from "./components/Logout";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        {/* Login */}
        <Route exact path="/">
          <Login />
        </Route>
        {/* Register */}
        <Route exact path="/register">
          <Register />
        </Route>
        {/* Logout */}
        <Route exact path="/logout">
          <Logout />
        </Route>
        {/* Dashboard */}
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        {/* Forgot Password */}
        <Route exact path="/forgotpassword">
          <ForgotPassword />
        </Route>
        {/* Reset Password */}
        <Route exact path="/resetpassword/:token">
          <ResetPassword />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
