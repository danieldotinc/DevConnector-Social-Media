import {
  GET_PROFILE,
  PROFILE_LOADING,
  ADD_PROFILE,
  ADD_EXPERIENCE,
  EDIT_PROFILE
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case EDIT_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
