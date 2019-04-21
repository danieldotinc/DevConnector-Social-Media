import {
  getProfile,
  addProfile,
  getProfileByHandle
} from "../../services/profileService";
import { GET_PROFILE, PROFILE_LOADING, ADD_PROFILE, GET_ERRORS } from "./types";

export const getProfileItem = () => async dispatch => {
  try {
    dispatch(setProfileLoading());
    const { data: profile } = await getProfile();
    dispatch({
      type: GET_PROFILE,
      payload: profile
    });
  } catch (ex) {
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
  }
};

export const getProfileItemByHandle = handle => async dispatch => {
  try {
    dispatch(setProfileLoading());
    const { data: profile } = await getProfileByHandle(handle);
    dispatch({
      type: GET_PROFILE,
      payload: profile
    });
  } catch (ex) {
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
  }
};

export const createProfileItem = (profile, location) => async dispatch => {
  try {
    const { data: pro } = await addProfile(profile);
    dispatch({
      type: ADD_PROFILE,
      payload: pro
    });
    window.location = location.state ? location.state.from.pathname : "/";
  } catch (ex) {
    if (ex.response && ex.response.status === 400)
      dispatch({ type: GET_ERRORS, payload: ex.response.data });
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
