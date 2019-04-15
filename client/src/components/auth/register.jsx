import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../state/actions/authActions";
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

  handleChange = e => {
    const data = { ...this.state.data };
    data[e.target.name] = e.target.value;
    this.setState({ data });
  };

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
                <div className="form-group">
                  <input
                    type="text"
                    className={`form-control form-control-lg ${errors.name &&
                      "is-invalid"}`}
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={`form-control form-control-lg ${errors.email &&
                      "is-invalid"}`}
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control form-control-lg ${errors.password &&
                      "is-invalid"}`}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control form-control-lg ${errors.password2 &&
                      "is-invalid"}`}
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">{errors.password2}</div>
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

const mapPropsToState = state => ({
  errors: state.error.errors
});

export default connect(
  mapPropsToState,
  { registerUser }
)(Register);
