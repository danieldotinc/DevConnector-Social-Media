import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addEducationItem } from "../../state/actions/profileActions";
import PropTypes from "prop-types";
import Form from "../form/form";

class AddEducation extends Form {
  state = {
    data: {
      school: "",
      degree: "",
      fieldOfStudy: "",
      from: "",
      to: "",
      current: false,
      description: ""
    },
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    const { errors } = nextProps;
    if (errors) this.setState({ errors });
  }

  handleSubmit = e => {
    e.preventDefault();

    const education = { ...this.state.data };

    Object.keys(education).map(e => {
      if (!education[e]) delete education[e];
    });
    education.current = this.state.data.current;

    this.props.addEducationItem(education, this.props.history);
  };

  render() {
    const { current } = this.state.data;
    const { errors } = this.state;

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/Dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attend
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput(
                  "degree",
                  "* Degree or Certification",
                  errors.degree
                )}
                {this.renderInput("school", "* School", errors.school)}
                {this.renderInput(
                  "fieldOfStudy",
                  "* Field Of Study",
                  errors.fieldOfStudy
                )}
                <h6>From Date</h6>
                {this.renderInput("from", "", errors.from, "", "12", "date")}
                <h6>To Date</h6>
                {this.renderInput(
                  "to",
                  "",
                  errors.to,
                  "",
                  "12",
                  "date",
                  current ? "disabled" : ""
                )}
                {this.renderSwitch("current", "Current Job")}
                {this.renderTextarea(
                  "description",
                  "Program Description",
                  errors.description,
                  "Tell us about the program that you were in"
                )}
                {this.renderSubmit()}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducationItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.error.errors
});

export default connect(
  mapStateToProps,
  { addEducationItem }
)(AddEducation);
