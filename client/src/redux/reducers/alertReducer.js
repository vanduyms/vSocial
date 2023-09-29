const { createSlice } = require("@reduxjs/toolkit")


const initialState = {
  message: "",
  active: false
}

const alertReducer = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, { payload }) => {
      state.message = payload.message
      state.active = payload.active
    }
  },
});

export const { setAlert } = alertReducer.actions;
export default alertReducer.reducer;