import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { BeatLoader } from "react-spinners";
import PropTypes from "prop-types";
import PostItem from "./postItem";
import CommentForm from "./commentForm";
import CommentFeed from "./commentFeed";
import { getPostItem } from "../../state/actions/postActions";

class Post extends Component {
  componentDidMount() {
    this.props.getPostItem(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props;
    if (loading || !post)
      return (
        <div className="centered">
          <BeatLoader sizeUnit={"px"} size={20} color={"#696969"} />
        </div>
      );
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link className="btn btn-light mb-3" to="/Feed">
                Back to Feed
              </Link>
              <PostItem post={post} actions={false} />
              <CommentForm postId={post._id} />
              <CommentFeed postId={post._id} comments={post.comments} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getPostItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post.post,
  loading: state.post.loading
});

export default connect(
  mapStateToProps,
  { getPostItem }
)(Post);
