import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDataAPI } from "../../utils/fetchData";

export const getSuggestionUser = createAsyncThunk('api/suggestionUser', async ({ auth }, { rejectWithValue }) => {
  try {
    const res = await getDataAPI(`suggestionsUser`, auth.userToken);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data.msg) return rejectWithValue(error.response.data.msg);
    else return rejectWithValue(error.response);
  }
})