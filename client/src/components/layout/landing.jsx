import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../../services/authService";

class Landing extends Component {
  state = {};
  render() {
    const user = auth.getCurrentUser();
    if (user) this.props.history.push("/Dashboard");
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Connector</h1>
                <p className="lead">
                  {" "}
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <hr />
                <Link to="/Register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/Login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
