import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDataAPI } from "../../utils/fetchData";

export const getDiscoverPosts = createAsyncThunk('api/post_discover', async ({ auth }, { rejectWithValue }) => {
  try {
    const res = await getDataAPI(`post_discover`, auth.userToken);
    return res.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.msg) return rejectWithValue(error.response.data.msg);
    else return rejectWithValue(error.response);
  }
})