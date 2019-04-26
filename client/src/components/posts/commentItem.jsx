import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import auth from "../../services/authService";
import { deleteCommentItem } from "../../state/actions/postActions";

class CommentItem extends Component {
  handleDelete = (postId, commentId) =>
    this.props.deleteCommentItem(postId, commentId);

  render() {
    const user = auth.getCurrentUser();
    const { postId, comment } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {user._id == comment.user && (
              <button
                type="button"
                className="btn btn-danger mr-1"
                onClick={() => this.handleDelete(postId, comment._id)}
              >
                <i className="fa fa-trash" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  deleteCommentItem: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteCommentItem }
)(CommentItem);
