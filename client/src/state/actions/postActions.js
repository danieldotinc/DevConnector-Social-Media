import { ADD_POST, GET_ERRORS, POST_LOADING, GET_POSTS } from "./types";
import { addPost, getPosts } from "../../services/postService";

export const addPostItem = post => async dispatch => {
  try {
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

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
