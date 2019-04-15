import React, { Component } from "react";
import { loginUser } from "../../state/actions/authActions";
import { connect } from "react-redux";
import auth from "../../services/authService";

class Login extends Component {
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

  handleChange = e => {
    const data = { ...this.state.data };
    data[e.target.name] = e.target.value;
    this.setState({ data });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.props.loginUser(this.state.data, this.props.location);
  };

  render() {
    const { email, password } = this.state.data;
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
