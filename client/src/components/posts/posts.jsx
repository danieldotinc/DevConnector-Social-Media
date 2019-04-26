import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BeatLoader } from "react-spinners";
import { getPostItems } from "../../state/actions/postActions";
import PostForm from "./postForm";
import PostFeed from "./postFeed";

class Posts extends Component {
  state = {};

  componentDidMount() {
    this.props.getPostItems();
  }

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
              <PostFeed posts={posts} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPostItems: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  posts: state.post.posts,
  loading: state.post.loading
});

export default connect(
  mapStateToProps,
  { getPostItems }
)(Posts);
