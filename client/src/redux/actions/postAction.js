import { createAsyncThunk } from "@reduxjs/toolkit";
import { imageUpload } from "../../utils/imageUpload";
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI } from "../../utils/fetchData";
import { setAlert } from "../reducers/alertReducer";

export const createPostAction = createAsyncThunk('api/createPost', async ({ auth, content, image, dispatch }, { rejectWithValue }) => {
  try {
    let media;
    if (image) media = await imageUpload([image]);
    const res = await postDataAPI('post', {
      content,
      images: media ? [media[0].url] : ['']
    }, auth.userToken);

    return res;
  } catch (error) {
    dispatch(setAlert({
      message: error.response.data.msg,
      active: true
    }));
    if (error.response && error.response.data.msg) return rejectWithValue(error.response.data.msg);
    else return rejectWithValue(error.response);
  }
});

export const getPostAction = createAsyncThunk('api/post', async ({ auth, id }, { rejectWithValue }) => {
  try {
    const res = await getDataAPI(`post/${id}`, auth.userToken);
    return res;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data.msg);
    }
    else {
      return rejectWithValue(error.response);
    }
  }
});

export const getAllPostsAction = createAsyncThunk('api/allPost', async ({ auth }, { rejectWithValue }) => {
  try {
    const res = await getDataAPI("post", auth.userToken);
    return res;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data.msg);
    }
    else {
      return rejectWithValue(error.response);
    }
  }
});

export const getUserPostsAction = createAsyncThunk('api/user_post', async ({ auth, id }, { rejectWithValue }) => {
  try {
    const res = await getDataAPI(`user_posts/${id}`, auth.userToken);
    return res;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data.msg);
    }
    else {
      return rejectWithValue(error.response);
    }
  }
});

export const likePostAction = createAsyncThunk('api/post/:id/like', async ({ auth, postItem, socket }, { rejectWithValue }) => {
  try {
    const newPost = { ...postItem, likes: [...postItem.likes, auth.userInfo] };
    socket.socket.emit("likePost", newPost);

    await patchDataAPI(`post/${postItem._id}/like`, { id: postItem._id }, auth.userToken);

    return newPost;
  } catch (error) {
    console.log(error)
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data.msg);
    }
    else {
      return rejectWithValue(error.response);
    }
  }
})

export const unLikePostAction = createAsyncThunk('api/post/:id/unlike', async ({ auth, postItem, socket }, { rejectWithValue }) => {
  try {
    const newPost = { ...postItem, likes: postItem.likes.filter(like => like._id !== auth.userInfo._id) }
    socket.socket.emit("unLikePost", newPost);

    await patchDataAPI(`post/${postItem._id}/unlike`, { id: postItem._id }, auth.userToken);

    return newPost;
  } catch (error) {
    console.log(error)
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data.msg);
    }
    else {
      return rejectWithValue(error.response);
    }
  }
})


export const deletePostAction = createAsyncThunk('api/post/:id/delete', async ({ auth, id }, { rejectWithValue }) => {
  try {
    const res = await deleteDataAPI(`post/${id}`, auth.userToken);
    return res;
  } catch (error) {
    console.log(error)
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data.msg);
    }
    else {
      return rejectWithValue(error.response);
    }
  }
})

export const updatePostAction = createAsyncThunk('api/post/:id/update', async ({ auth, content, image, id, dispatch }, { rejectWithValue }) => {
  try {
    const res = await patchDataAPI(`post/${id}`, { content, image }, auth.userToken);
    return res.data.newPost;
  } catch (error) {
    dispatch(setAlert({
      message: error.response.data.msg,
      active: true
    }));
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data.msg);
    }
    else {
      return rejectWithValue(error.response);
    }
  }
})