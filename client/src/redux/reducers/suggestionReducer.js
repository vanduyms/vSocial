import { getSuggestionUser } from "../actions/suggestionAction";

const { createSlice } = require("@reduxjs/toolkit")


const initialState = {
  loading: false,
  users: []
}

const suggestionUser = createSlice({
  name: 'suggestion',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getSuggestionUser.pending]: (state) => {
      state.loading = true
    },
    [getSuggestionUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.users = [...payload.users]
    }
  }
});

export const { } = suggestionUser.actions;
export default suggestionUser.reducer;