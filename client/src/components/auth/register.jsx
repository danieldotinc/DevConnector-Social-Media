import React, { Component } from "react";

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

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.data);
  };

  render() {
    const { name, email, password, password2 } = this.state.data;
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
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={this.handleChange}
                  />
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

export default Register;
