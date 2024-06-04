import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDataAPI, getDataAPI, putDataAPI, postDataAPI } from "../../utils/fetchData";

export const getNotifies = createAsyncThunk('api/notifies', async ({ auth }, { rejectWithValue }) => {
  try {
    const res = await getDataAPI('notifies', auth.userToken);
    return res;
  } catch (error) {
    if (error.response && error.response.data.msg) return rejectWithValue(error.response.data.msg);
    else return rejectWithValue(error.response);
  }
})

export const createNotify = createAsyncThunk('api/notify', async ({ msg, auth }, { rejectWithValue }) => {
  try {
    const res = await postDataAPI('notify', msg, auth.userToken)
    return res;
  } catch (error) {
    if (error.response && error.response.data.msg) return rejectWithValue(error.response.data.msg);
    else return rejectWithValue(error.response);
  }
})

export const removeNotify = createAsyncThunk('api/notify/:id/remove', async ({ msg, auth }, { rejectWithValue }) => {
  try {
    await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.userToken);
    return msg;
  } catch (error) {
    if (error.response && error.response.data.msg) return rejectWithValue(error.response.data.msg);
    else return rejectWithValue(error.response);
  }
})

export const isReadNotify = createAsyncThunk('api/notify/:id/read', async ({ msg, auth }, { rejectWithValue }) => {
  try {
    await putDataAPI(`isReadNotify/${msg.id}`, auth.userToken)
  } catch (error) {
    if (error.response && error.response.data.msg) return rejectWithValue(error.response.data.msg);
    else return rejectWithValue(error.response);
  }
})

export const deleteAllNotifies = createAsyncThunk('api/notifies/delete', async ({ auth }, { rejectWithValue }) => {
  try {
    await deleteDataAPI(`deleteAllNotify`, auth.userToken);
  } catch (error) {
    if (error.response && error.response.data.msg) return rejectWithValue(error.response.data.msg);
    else return rejectWithValue(error.response);
  }
})