import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: []
}

const onlineReducer = createSlice({
  name: "online",
  initialState,
  reducers: {
    setOnline: (state, { payload }) => {
      state.user = [...state.user, payload]
    },
    setOffline: (state, { payload }) => {
      state.user = state.user.filter(item => item !== payload)
    }
  },
  extraReducers: {

  }
});

export const {
  setOffline, setOnline
} = onlineReducer.actions;
export default onlineReducer.reducer;