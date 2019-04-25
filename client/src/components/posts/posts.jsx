import React, { Component } from "react";
import { connect } from "react-redux";
import { BeatLoader } from "react-spinners";
import { getPostItems } from "../../state/actions/postActions";
import PostForm from "./postForm";

class Posts extends Component {
  state = {};
  render() {
    const { loading, posts } = this.props;
    if (loading || !posts)
      return (
        <div className="centered">
          <BeatLoader sizeUnit={"px"} size={20} color={"#696969"} />
        </div>
      );
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.post.posts,
  loading: state.post.loading
});

export default connect(
  mapStateToProps,
  { getPostItems }
)(Posts);
