export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POSTS = "UPDATE_POSTS";
export const SET_LOADING = "SET_LOADING";

export const addPost = (post) => {
  return {
    type: ADD_POST,
    payload: post,
  };
};

export const deletePost = (postId) => {
  return {
    type: DELETE_POST,
    payload: postId,
  };
};

export const updatePosts = (posts) => {
  return {
    type: UPDATE_POSTS,
    payload: posts,
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_LOADING,
    payload: loading,
  };
};
