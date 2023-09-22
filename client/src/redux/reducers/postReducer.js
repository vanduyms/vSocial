import { createSlice } from "@reduxjs/toolkit";
import { createPostAction, getAllPostsAction, likePostAction, unLikePostAction, getUserPostsAction, deletePostAction, updatePostAction, getPostAction } from "../actions/postAction";
import { EditData } from "../data";

const initialState = {
  loading: false,
  posts: [],
  result: 0,
  page: 2
}

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updatePost: (state, { payload }) => {
      state.posts = EditData(state.posts, payload._id, payload)
    }
  },
  extraReducers: {
    [createPostAction.pending]: (state) => {
      state.loading = true
    },
    [createPostAction.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.posts = [...state.posts, payload.data.newPost]
    },
    [getAllPostsAction.pending]: (state) => {
      state.loading = true
    },
    [getAllPostsAction.fulfilled]: (state, { payload }) => {
      state.posts = payload.data.posts
      state.result = payload.data.result
      state.loading = false
    },
    [getUserPostsAction.pending]: (state) => {
      state.loading = true
    },
    [getUserPostsAction.fulfilled]: (state, { payload }) => {
      state.posts = payload.data.posts
      state.result = payload.data.result
      state.loading = false
    },
    [likePostAction.pending]: (state) => {
      // state.loading = true
    },
    [likePostAction.fulfilled]: (state, { payload }) => {
      // state.loading = false
      state.posts = EditData(state.posts, payload._id, payload);
    },
    [unLikePostAction.pending]: (state) => {
      // state.loading = true
    },
    [unLikePostAction.fulfilled]: (state, { payload }) => {
      // state.loading = false
      state.posts = EditData(state.posts, payload._id, payload);
    },
    [deletePostAction.pending]: (state) => {
      state.loading = true
    },
    [deletePostAction.fulfilled]: (state) => {
      state.loading = false
    },
    [updatePostAction.pending]: (state) => {
      state.loading = true
    },
    [updatePostAction.fulfilled]: (state) => {
      state.loading = false
    }, [getPostAction.pending]: (state) => {
      state.loading = true
    },
    [getPostAction.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.posts = [payload.data.post]
    },
  }
});

export const {
  updatePost,
} = postSlice.actions;
export default postSlice.reducer;