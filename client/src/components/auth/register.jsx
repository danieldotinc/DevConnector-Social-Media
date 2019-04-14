import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../state/actions/authActions";
import * as userService from "../../services/userService";
import auth from "../../services/authService";

class Register extends Component {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      password2: ""
    },
    errors: {}
  };

  handleChange = e => {
    const data = { ...this.state.data };
    data[e.target.name] = e.target.value;
    this.setState({ data });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        this.setState({ errors: ex.response.data });
      console.log(this.state.errors);
    }
  };

  render() {
    const { name, email, password, password2 } = this.state.data;
    const {
      name: error_name,
      email: error_email,
      password: error_password,
      password2: error_password2
    } = this.state.errors;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={`form-control form-control-lg ${error_name &&
                      "is-invalid"}`}
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">{error_name}</div>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={`form-control form-control-lg ${error_email &&
                      "is-invalid"}`}
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">{error_email}</div>
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control form-control-lg ${error_password &&
                      "is-invalid"}`}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">{error_password}</div>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control form-control-lg ${error_password2 &&
                      "is-invalid"}`}
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">{error_password2}</div>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { registerUser }
)(Register);
