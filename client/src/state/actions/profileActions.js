import {
  getProfile,
  addProfile,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  editProfile,
  getProfileByHandle,
  deleteAccount
} from "../../services/profileService";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  ADD_PROFILE,
  GET_ERRORS,
  EDIT_PROFILE
} from "./types";

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

export const createProfileItem = (profile, history) => async dispatch => {
  try {
    const { data: pro } = await addProfile(profile);
    dispatch({
      type: ADD_PROFILE,
      payload: pro
    });
    history.push("/Dashboard");
  } catch (ex) {
    if (ex.response && ex.response.status === 400)
      dispatch({ type: GET_ERRORS, payload: ex.response.data });
  }
};

export const editProfileItem = (profile, history) => async dispatch => {
  try {
    const { data: pro } = await editProfile(profile);
    dispatch({
      type: EDIT_PROFILE,
      payload: pro
    });
    history.push("/Dashboard");
  } catch (ex) {
    if (ex.response && ex.response.status === 400)
      dispatch({ type: GET_ERRORS, payload: ex.response.data });
  }
};

export const addExperienceItem = (experience, history) => async dispatch => {
  try {
    await addExperience(experience);
    history.push("/Dashboard");
  } catch (ex) {
    if (ex.response && ex.response.status === 400)
      dispatch({ type: GET_ERRORS, payload: ex.response.data });
  }
};

export const addEducationItem = (education, history) => async dispatch => {
  try {
    await addEducation(education);
    history.push("/Dashboard");
  } catch (ex) {
    if (ex.response && ex.response.status === 400)
      dispatch({ type: GET_ERRORS, payload: ex.response.data });
  }
};

export const deleteExperienceItem = id => async dispatch => {
  try {
    const { data } = await deleteExperience(id);
    dispatch({
      type: GET_PROFILE,
      payload: data
    });
  } catch (ex) {
    dispatch({
      type: GET_ERRORS,
      payload: ex.response.data
    });
  }
};

export const deleteEducationItem = id => async dispatch => {
  try {
    const { data } = await deleteEducation(id);
    dispatch({
      type: GET_PROFILE,
      payload: data
    });
  } catch (ex) {
    dispatch({
      type: GET_ERRORS,
      payload: ex.response.data
    });
  }
};

export const deleteUserAccount = () => async dispatch => {
  try {
    if (
      window.confirm(
        "Are you sure about this? Your account will be deleted permanently!"
      )
    )
      await deleteAccount();
  } catch (ex) {
    dispatch({
      type: GET_ERRORS,
      payload: ex.response.data
    });
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
