import { createSlice } from "@reduxjs/toolkit";
import { refreshToken, resetPassword, sendResetPassword, userLogin, userRegister } from "../actions/authAction";

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
  success: false,
  resetInfo: null
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
    setCredentials: (state, { payload }) => {
      localStorage.setItem("userInfo", JSON.stringify(payload))
      state.userInfo = payload
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload
    }
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
      state.userInfo = payload.data.user
      state.userToken = payload.data.access_token
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
      state.userInfo = payload.data.user
      state.userToken = payload.data.access_token
      state.success = true
    },
    [userRegister.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.success = false
    },
    [refreshToken.rejected]: (state, { payload }) => {
      console.log(payload)
    },
    [sendResetPassword.pending]: (state) => {
      state.loading = true
    },
    [sendResetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
      state.resetInfo = { payload }
    },
    [sendResetPassword.rejected]: (state) => {
      state.loading = false
    },
    [resetPassword.pending]: (state) => {
      state.loading = true
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
      state.resetInfo = { payload }
    },
    [resetPassword.rejected]: (state) => {
      state.loading = false
    },
  }
});

export const { logout, setCredentials, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;