import React, { Component } from "react";
import { connect } from "react-redux";
import auth from "../../services/authService";
import PropTypes from "prop-types";
import { addCommentItem } from "../../state/actions/postActions";
import Form from "../form/form";

class CommentForm extends Form {
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
    const { postId } = this.props;
    const comment = {
      user: user._id,
      text: this.state.data.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addCommentItem(postId, comment);
    this.setState({ data: { text: "" }, errors: {} });
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              {this.renderTextarea("text", "Reply to post", errors.text)}
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

CommentForm.propTypes = {
  addCommentItem: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.error.errors
});

export default connect(
  mapStateToProps,
  { addCommentItem }
)(CommentForm);
