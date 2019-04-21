import React, { Component } from "react";
import { loginUser } from "../../state/actions/authActions";
import { connect } from "react-redux";
import auth from "../../services/authService";
import Form from "../form/form";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {}
  };

  componentDidMount() {
    if (auth.getCurrentUser())
      window.location = this.props.location.state
        ? this.props.location.state.from.pathname
        : "/";
  }

  componentWillReceiveProps(nextProps) {
    const { errors } = nextProps;
    if (errors) this.setState({ errors });
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.props.loginUser(this.state.data, this.props.location);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput(
                  "email",
                  "Email",
                  errors.email,
                  "",
                  "12",
                  "email"
                )}
                {this.renderInput(
                  "password",
                  "Password",
                  errors.password,
                  "",
                  "12",
                  "password"
                )}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapPropsToState = state => ({
  errors: state.error.errors
});

export default connect(
  mapPropsToState,
  { loginUser }
)(Login);
