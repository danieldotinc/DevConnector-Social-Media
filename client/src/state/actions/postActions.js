import {
  ADD_POST,
  GET_ERRORS,
  POST_LOADING,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  CLEAR_ERRORS
} from "./types";
import {
  addPost,
  deleteComment,
  addComment,
  getPosts,
  getPost,
  deletePost,
  likePost
} from "../../services/postService";

export const addPostItem = post => async dispatch => {
  try {
    dispatch(clearErrors());
    await addPost(post);
    dispatch({
      type: ADD_POST,
      payload: post
    });
  } catch (ex) {
    dispatch({
      type: GET_ERRORS,
      payload: ex.response.data
    });
  }
};

export const addCommentItem = (postId, comment) => async dispatch => {
  try {
    dispatch(clearErrors());
    const { data: post } = await addComment(postId, comment);
    dispatch({
      type: GET_POST,
      payload: post
    });
  } catch (ex) {
    dispatch({
      type: GET_ERRORS,
      payload: ex.response.data
    });
  }
};

export const deleteCommentItem = (postId, commentId) => async dispatch => {
  try {
    const { data: post } = await deleteComment(postId, commentId);
    dispatch({
      type: GET_POST,
      payload: post
    });
  } catch (ex) {
    dispatch({
      type: GET_ERRORS,
      payload: ex.response.data
    });
  }
};

export const likePostItem = id => async dispatch => {
  try {
    await likePost(id);
    dispatch(getPostItems());
  } catch (ex) {
    dispatch({
      type: GET_ERRORS,
      payload: ex.response.data
    });
  }
};

export const getPostItems = () => async dispatch => {
  try {
    dispatch(setPostLoading());
    const { data: posts } = await getPosts();
    dispatch({
      type: GET_POSTS,
      payload: posts
    });
  } catch (ex) {
    dispatch({
      type: GET_POSTS,
      payload: []
    });
  }
};

export const getPostItem = id => async dispatch => {
  try {
    dispatch(setPostLoading());
    const { data: post } = await getPost(id);
    dispatch({
      type: GET_POST,
      payload: post
    });
  } catch (ex) {
    dispatch({
      type: GET_POST,
      payload: {}
    });
  }
};

export const deletePostItem = id => async dispatch => {
  try {
    await deletePost(id);
    dispatch({
      type: DELETE_POST,
      payload: id
    });
  } catch (ex) {
    dispatch({
      type: GET_ERRORS,
      payload: ex.response.data
    });
  }
};

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
