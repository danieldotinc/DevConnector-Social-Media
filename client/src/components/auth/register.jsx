import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../state/actions/authActions";
import auth from "../../services/authService";
import Form from "../form/form";

class Register extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      password2: ""
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
    this.props.registerUser(this.state.data, this.props.location);
  };

  render() {
    const { name, email, password, password2 } = this.state.data;
    const { errors } = this.state;
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
                {this.renderInput("name", "Name", errors.name)}
                {this.renderInput(
                  "email",
                  "email",
                  errors.email,
                  "This site uses Gravatar so if you want a profile image, use a Gravatar email",
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
                {this.renderInput(
                  "password2",
                  "Password",
                  errors.password2,
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
  { registerUser }
)(Register);
