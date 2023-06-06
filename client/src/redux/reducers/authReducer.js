import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister } from "../actions/authAction";

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const userInfo = localStorage.getItem('userInfo')
  ? localStorage.getItem('userInfo')
  : null;

const initialState = {
  loading: false,
  userInfo,
  userToken,
  error: null,
  success: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken')
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
    setCredentials: (state, action) => {
      state.userInfo = action.payload
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.userToken
      state.success = true

    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.success = false
    },
    [userRegister.pending]: (state) => {
      state.loading = true
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.userToken
      state.success = true
    },
    [userRegister.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.success = false
    },
  }
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;