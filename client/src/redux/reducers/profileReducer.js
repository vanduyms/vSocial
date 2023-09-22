import { followUser, getProfileUser, unfollowUser, updateProfileUser } from "../actions/profileAction";
import { EditData } from "../data";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  ids: [],
  users: [],
  posts: []
}

const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updatePost: (state, { payload }) => {
      state.posts = EditData(state.posts, payload._id, payload)
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
      state.users = [...state.users, payload.user]
      state.posts = [...state.posts, ...payload.posts]
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

    },
    [updateProfileUser.fulfilled]: (state, { payload }) => {
      state.users = EditData(state.users, payload._id, payload)
    }
  }
});

export const {
  updatePost, setUser, getId
} = profileReducer.actions;
export default profileReducer.reducer;