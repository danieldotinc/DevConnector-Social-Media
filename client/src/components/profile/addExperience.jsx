import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addExperienceItem } from "../../state/actions/profileActions";
import PropTypes from "prop-types";
import Form from "../form/form";

class AddExperience extends Form {
  state = {
    data: {
      company: "",
      title: "",
      location: "",
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

    const experience = { ...this.state.data };

    Object.keys(experience).map(e => {
      if (!experience[e]) delete experience[e];
    });
    experience.current = this.state.data.current;

    this.props.addExperienceItem(experience, this.props.history);
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
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("title", "* Title", errors.title)}
                {this.renderInput("company", "* Company", errors.company)}
                {this.renderInput("location", "location", errors.location)}
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
                  "Experience Description",
                  errors.description,
                  "Tell us about your experience in the company"
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

AddExperience.propTypes = {
  addExperienceItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.error.errors
});

export default connect(
  mapStateToProps,
  { addExperienceItem }
)(AddExperience);
