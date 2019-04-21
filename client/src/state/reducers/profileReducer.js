import {
  GET_PROFILE,
  PROFILE_LOADING,
  ADD_PROFILE,
  ADD_EXPERIENCE,
  GET_GITHUB_REPOS,
  EDIT_PROFILE,
  GET_PROFILES
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  repos: null,
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
    case GET_GITHUB_REPOS:
      return {
        ...state,
        repos: action.payload
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
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
