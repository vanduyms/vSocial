import { createSlice } from "@reduxjs/toolkit";
import { createCommentAction, deleteCommentAction, updateCommentAction } from "../actions/commentAction";
import { createPostAction, getAllPostsAction, likePostAction, unLikePostAction, getUserPostsAction, deletePostAction, updatePostAction, getPostAction } from "../actions/postAction";
import { EditData } from "../data";

const initialState = {
  loading: false,
  posts: [],
  result: 0,
  page: 1
}

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updatePost: (state, { payload }) => {
      state.posts = EditData(state.posts, payload._id, payload)
    },
    updateState: (state, { payload }) => {
      state.posts = [...state.posts, ...payload.posts]
      state.page = payload.page
      state.result = state.posts.length
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
      state.page = 2
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
    [updatePostAction.fulfilled]: (state, { payload }) => {
      state.posts = [payload]
      state.loading = false
    },
    [getPostAction.pending]: (state) => {
      state.loading = true
    },
    [getPostAction.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.posts = [payload.data.post]
    },

    // Comment
    [createCommentAction.pending]: (state) => {

    },
    [createCommentAction.fulfilled]: (state, { payload }) => {
      state.posts = EditData(state.posts, payload._id, payload);
    },
    [updateCommentAction.pending]: (state) => {

    },
    [updateCommentAction.fulfilled]: (state, { payload }) => {
      state.posts = EditData(state.posts, payload._id, payload);
    },
    [deleteCommentAction.pending]: (state) => {

    },
    [deleteCommentAction.fulfilled]: (state, { payload }) => {
      state.posts = EditData(state.posts, payload._id, payload);
    }
  }
});

export const {
  updatePost, updateState
} = postSlice.actions;
export default postSlice.reducer;