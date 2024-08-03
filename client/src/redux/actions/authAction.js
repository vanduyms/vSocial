import { createAsyncThunk } from "@reduxjs/toolkit";
import { postDataAPI, postDataAPIWithoutAuth } from "../../utils/fetchData";
import { setAlert } from "../reducers/alertReducer";
export const userLogin = createAsyncThunk(
  'api/login',
  async ({ data, dispatch }, { rejectWithValue }) => {
    try {
      const res = await postDataAPI('login', data);

      localStorage.setItem('userToken', res.data.access_token);
      localStorage.setItem('userInfo', JSON.stringify(res.data.user));

      localStorage.setItem('firstLogin', true);
      return res;
    } catch (error) {
      dispatch(setAlert({
        message: error.response.data.msg,
        active: true
      }));
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.response);
      }
    }
  }
)

export const userRegister = createAsyncThunk(
  'api/register',
  async ({ data, dispatch }, { rejectWithValue }) => {
    try {
      const res = await postDataAPI('register', data);

      localStorage.setItem('userToken', res.data.access_token)
      return res;
    } catch (error) {
      dispatch(setAlert({
        message: error.response.data.msg,
        active: true
      }));
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.response);
      }
    }
  }
)

export const refreshToken = createAsyncThunk(
  'api/refreshToken',
  async ({ rejectWithValue }) => {
    const firstLogin = localStorage.getItem("firstLogin")
    if (firstLogin) {
      try {
        const res = await postDataAPI('refresh_token');
        return res;
      } catch (error) {
        if (error.response && error.response.data.msg) {
          return rejectWithValue(error.response.data.msg)
        } else {
          return rejectWithValue(error.response);
        }
      }
    }
  }
)

export const sendResetPassword = createAsyncThunk(
  'api/resetPassword',
  async ({ email, dispatch }, { rejectWithValue }) => {
    try {
      const res = await postDataAPIWithoutAuth('resetPassword', { email });


      return res;

    } catch (error) {
      dispatch(setAlert({
        message: error.response.data.msg,
        active: true
      }));

      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.response);
      }
    }
  }
)

export const resetPassword = createAsyncThunk(
  'api/resetPassword/:id',
  async ({ password, id, token, dispatch }, { rejectWithValue }) => {
    try {
      const res = await postDataAPI(`resetPassword/${id}/${token}`, { password });
      return res;
    } catch (error) {
      dispatch(setAlert({
        message: error.response.data.msg,
        active: true
      }));
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.response);
      }
    }
  }
)