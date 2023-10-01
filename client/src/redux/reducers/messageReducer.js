import { createSlice } from "@reduxjs/toolkit";
import { addMessageAction, getConversations, getMessages, deleteConversation, deleteMessage, loadMoreMessages } from "../actions/messageAction";
import { DeleteData, EditData } from "../data";

const initialState = {
  users: [],
  resultUsers: 0,
  data: [],
  firstLoad: false
}

const messageReducer = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      if (state.users.every(item => item._id !== payload._id)) {
        state.users = [payload, ...state.users]
      };
    },
    addMessage: (state, { payload }) => {
      state.data.forEach((item) => {
        item.messages.push(payload)
        item.result = item.messages.length
      });
    }
  },
  extraReducers: {
    [addMessageAction.pending]: (state) => {

    },
    [addMessageAction.fulfilled]: (state, { payload }) => {
      state.data.forEach((item) => {
        item.messages.push(payload)
        item.result = item.messages.length
      });
    },
    [getMessages.pending]: (state) => {

    },
    [getMessages.fulfilled]: (state, { payload }) => {
      state.data = [payload]
    },
    [getConversations.pending]: (state) => {

    },
    [getConversations.fulfilled]: (state, { payload }) => {
      state.users = payload.newArr
      state.resultUsers = payload.result
      state.firstLoad = true
    },
    [deleteConversation.pending]: (state) => {

    },
    [deleteConversation.fulfilled]: (state, { payload }) => {
      state.users = DeleteData(state.users, payload)
      state.data = DeleteData(state.data, payload)
    },
    [deleteMessage.pending]: (state) => {

    },
    [deleteMessage.fulfilled]: (state, { payload }) => {
      state.data[0].messages = DeleteData(state.data[0].messages, payload)
    },
    [loadMoreMessages.pending]: (state) => {

    },
    [loadMoreMessages.fulfilled]: (state, { payload }) => {
      state.data = EditData(state.data, payload._id, payload)
    }
  }
});

export const {
  addUser, addMessage
} = messageReducer.actions;
export default messageReducer.reducer;