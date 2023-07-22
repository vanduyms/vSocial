import { getProfileUser } from "../actions/profileAction";

const { createSlice } = require("@reduxjs/toolkit")


const initialState = {
  loading: false,
  user: null,
  folowers: [],
  following: []
}

const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getProfileUser.pending]: (state) => {
      state.loading = true
    },
    [getProfileUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.user = payload.data.user
      state.followers = payload.data.user.followers
      state.following = payload.data.user.following
    },
    [getProfileUser.rejected]: (state, { payload }) => {
      state.loading = false
    },
  }
});

export default profileReducer.reducer;