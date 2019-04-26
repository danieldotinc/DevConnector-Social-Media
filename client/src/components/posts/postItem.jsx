import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import auth from "../../services/authService";
import { deletePostItem, likePostItem } from "../../state/actions/postActions";
import PropTypes from "prop-types";

class PostItem extends Component {
  handleDelete = id => this.props.deletePostItem(id);
  handleLike = id => this.props.likePostItem(id);

  render() {
    const { post, actions } = this.props;
    const user = auth.getCurrentUser();
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {actions && (
              <React.Fragment>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => this.handleLike(post._id)}
                >
                  <i
                    className={`text-secondary fa fa-thumbs-up ${post.likes &&
                      post.likes.some(e => e.user == user._id) &&
                      "text-info"}`}
                  />
                  <span className="badge badge-light">
                    {post.likes && post.likes.length}
                  </span>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {user._id == post.user && (
                  <button
                    type="button"
                    className="btn btn-danger mr-1"
                    onClick={() => this.handleDelete(post._id)}
                  >
                    <i className="fa fa-trash" />
                  </button>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  deletePostItem: PropTypes.func.isRequired,
  likePostItem: PropTypes.func.isRequired
};

export default connect(
  null,
  { deletePostItem, likePostItem }
)(PostItem);
