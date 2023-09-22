const { createSlice } = require("@reduxjs/toolkit")


const initialState = {
  message: "",
}

const alertReducer = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, { payload }) => {
      state.message = payload
    }
  },
});

export const { setAlert } = alertReducer.actions;
export default alertReducer.reducer;