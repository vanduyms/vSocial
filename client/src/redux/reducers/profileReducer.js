import { followUser, getProfileUser, unfollowUser, updateProfileUser } from "../actions/profileAction";
import { EditData } from "../data";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  ids: [],
  users: [],
  posts: [],
  page: 2,
  result: 0
}

const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updatePost: (state, { payload }) => {
      state.posts = EditData(state.posts, payload._id, payload)
    },
    updateState: (state, { payload }) => {
      state.posts = [...state.posts, ...payload.posts]
      state.page = payload.page
      state.result = state.posts.length
    },
    setUser: (state, { payload }) => {
      state.users = EditData(state.users, payload._id, payload)
    },
    getId: (state, { payload }) => {
      state.ids = [...state.ids, payload]
    }
  },
  extraReducers: {
    [getProfileUser.pending]: (state) => {
      state.loading = true
    },
    [getProfileUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.users = [payload.user]
      state.posts = [...payload.posts.posts]
      state.result = payload.posts.result
      state.page = 2
    },
    [getProfileUser.rejected]: (state, { payload }) => {
      state.loading = false
    },
    [followUser.pending]: (state) => {

    },
    [followUser.fulfilled]: (state, { payload }) => {
      state.users = EditData(state.users, payload._id, payload)
    },
    [unfollowUser.pending]: (state) => {

    },
    [unfollowUser.fulfilled]: (state, { payload }) => {
      state.users = EditData(state.users, payload.newUser._id, payload.newUser)
    },
    [updateProfileUser.pending]: (state) => {
      state.loading = true
    },
    [updateProfileUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.users = EditData(state.users, payload._id, payload)
    }
  }
});

export const {
  updatePost, updateState, setUser, getId
} = profileReducer.actions;
export default profileReducer.reducer;