import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import auth from "../../services/authService";

class Navbar extends Component {
  state = {};
  render() {
    const user = auth.getCurrentUser();
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            DevConnector
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/Profiles">
                  {" "}
                  Developers
                </NavLink>
              </li>
            </ul>

            {!user && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Register">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Login">
                    Login
                  </NavLink>
                </li>
              </ul>
            )}

            {user && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Feed">
                    Post Feed
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Profile">
                    <img
                      src={user.avatar}
                      style={{
                        width: "25px",
                        marginRight: "10px",
                        borderRadius: "7px"
                      }}
                    />
                    {user.name}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Logout">
                    Logout
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
