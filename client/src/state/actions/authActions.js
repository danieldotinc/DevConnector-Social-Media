import {
  GET_CURRENT_USER,
  REGISTER_USER,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";
import * as userService from "../../services/userService";
import auth from "../../services/authService";

export const registerUser = (userData, location) => async dispatch => {
  try {
    const response = await userService.register(userData);
    auth.loginWithJwt(response.headers["x-auth-token"]);
    dispatch({
      type: REGISTER_USER,
      payload: response.data
    });
    window.location = location.state ? location.state.from.pathname : "/";
  } catch (ex) {
    if (ex.response && ex.response.status === 400)
      dispatch({ type: GET_ERRORS, payload: ex.response.data });
  }
};

export const loginUser = (userCredentials, location) => async dispatch => {
  try {
    await auth.login(userCredentials);
    window.location = location.state ? location.state.from.pathname : "/";
  } catch (ex) {
    if (ex.response && ex.response.status == 400)
      dispatch({ type: GET_ERRORS, payload: ex.response.data });
  }
};
