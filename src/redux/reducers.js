import { combineReducers } from "redux";
import * as actionTypes from "./actions";

const initialState = {
  posts: [],
  loading: false,
};

const postsReducer = (state = initialState.posts, action) => {
  switch (action.type) {
    case actionTypes.ADD_POST:
      return [...state, action.payload];
    case actionTypes.DELETE_POST:
      return state.filter((post) => post.id !== action.payload);
    case actionTypes.UPDATE_POSTS:
      return action.payload;
    default:
      return state;
  }
};

const loadingReducer = (state = initialState.loading, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  posts: postsReducer,
  loading: loadingReducer,
});

export default rootReducer;
