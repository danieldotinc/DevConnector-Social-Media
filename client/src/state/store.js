import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import roorReducer from "./reducers";

const initialState = {};
const middleWare = [thunk];

const store = createStore(
  roorReducer,
  initialState,
  compose(applyMiddleware(...middleWare))
);

export default store;
