import React from "react";
import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Main
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            {/* <Link className="nav-link" to="/usersList"> */}
            <Link className="nav-link" to="/users">
              Users
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Layout;
