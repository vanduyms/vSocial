import { createSlice } from "@reduxjs/toolkit"
import { createNotify, getNotifies, removeNotify } from "../actions/notifyAction";
import { EditData } from "../data";

const initialState = {
  loading: false,
  data: []
}

const notifyReducer = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    updateNotify: (state, { payload }) => {
      state.data = EditData(state.data, payload._id, payload)
    }
  },
  extraReducers: {
    [getNotifies.pending]: (state) => {
      state.loading = true
    },
    [getNotifies.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.data = [...state.data, ...payload.data.notifies]
    },
    [createNotify.pending]: (state) => {
      state.loading = true
    },
    [createNotify.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.data = [...state.data, payload.data.notify]
    },
    [removeNotify.pending]: (state) => {
      state.loading = false
    },
    [removeNotify.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.data = state.data.filter(item => (
        item.id !== payload.id || item.url !== payload.url
      ))
    }
  }
});

export default notifyReducer.reducer;