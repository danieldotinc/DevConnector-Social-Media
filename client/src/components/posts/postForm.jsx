import React, { Component } from "react";
import { connect } from "react-redux";
import auth from "../../services/authService";
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
    const user = auth.getCurrentUser();
    const post = {
      user: user._id,
      text: this.state.data.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addPostItem(post);
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
