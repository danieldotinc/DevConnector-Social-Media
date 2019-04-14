import { REGISTER_USER, SET_CURRENT_USER } from "./types";

export const registerUser = userData => async dispatch => {
  dispatch({
    type: REGISTER_USER,
    payload: userData
  });
};
