import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDataAPI, getDataAPI, postDataAPI } from "../../utils/fetchData";

export const addMessageAction = createAsyncThunk('api/message/addMessage', async ({ msg, auth, socket }, { rejectWithValue }) => {
  try {
    const res = await postDataAPI('message', msg, auth.userToken);
    socket.socket.emit('addMessage', res.data.message)
    return res.data.message;
  } catch (error) {
    if (error.response && error.response.data.msg) return rejectWithValue(error.response.data.msg);
    else return rejectWithValue(error.response);
  }
})

export const getMessages = createAsyncThunk('api/messages/:id', async ({ auth, id, page = 1 }, { rejectWithValue }) => {
  try {
    const res = await getDataAPI(`message/${id}?limit=${page * 9}`, auth.userToken)
    const newData = { ...res.data, messages: res.data.messages.reverse() }

    return { ...newData, _id: id, page }
  } catch (error) {
    if (error.response && error.response.data.msg) return rejectWithValue(error.response.data.msg);
    else return rejectWithValue(error.response);
  }
})

export const getConversations = createAsyncThunk('api/conversations', async ({ auth, page = 1 }, { rejectWithValue }) => {
  try {
    const res = await getDataAPI(`conversations?page=${page}&limit=9`, auth.userToken);
    let newArr = [];

    res.data.conversations.forEach(item => {
      item.recipients.forEach(cv => {
        if (!newArr.find(item => item._id === cv._id)) { newArr.push({ ...cv, text: item.text, media: item.media, call: item.call }) }
      })
    });


    return { newArr, result: res.data.result }
  } catch (error) {
    if (error.response && error.response.data.msg) return rejectWithValue(error.response.data.msg);
    else return rejectWithValue(error.response);
  }
})

export const deleteMessage = createAsyncThunk('api/message/:id/delete', async ({ auth, msg }, { rejectWithValue }) => {
  try {
    await deleteDataAPI(`message/${msg._id}`, auth.userToken);
    return msg._id;
  } catch (error) {
    if (error.response && error.response.data.msg) return rejectWithValue(error.response.data.msg);
    else return rejectWithValue(error.response);
  }
})

export const deleteConversation = createAsyncThunk('api/conversations/:id/delete', async ({ auth, id }, { rejectWithValue }) => {
  try {
    await deleteDataAPI(`conversation/${id}`, auth.userToken);

    return id;
  } catch (error) {
    if (error.response && error.response.data.msg) return rejectWithValue(error.response.data.msg);
    else return rejectWithValue(error.response);
  }
})

export const loadMoreMessages = createAsyncThunk('api/message/loadMore', async ({ auth, id, page = 1 }, { rejectWithValue }) => {
  try {
    const res = await getDataAPI(`message/${id}?limit=${page * 9}`, auth.userToken)
    const newData = { ...res.data, messages: res.data.messages.reverse() }

    return { ...newData, _id: id, page }
  } catch (error) {
    if (error.response && error.response.data.msg) return rejectWithValue(error.response.data.msg);
    else return rejectWithValue(error.response);
  }
});