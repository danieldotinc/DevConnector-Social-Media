import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPostItem } from "../../state/actions/postActions";
import Form from "../form/form";

class PostForm extends Form {
  state = {
    data: {
      text: ""
    },
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    const { errors } = nextProps;
    if (errors) this.setState({ errors });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addPostItem(this.state.data);
    this.setState({ data: { text: "" }, errors: {} });
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              {this.renderTextarea("text", "Create a Post", errors.text)}
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPostItem: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.error.errors
});

export default connect(
  mapStateToProps,
  { addPostItem }
)(PostForm);
