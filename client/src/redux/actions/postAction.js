import { createAsyncThunk } from "@reduxjs/toolkit";
import { imageUpload } from "../../utils/imageUpload";
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI } from "../../utils/fetchData";
import { setAlert } from "../reducers/alertReducer";
import { createNotify, removeNotify } from "./notifyAction";

export const createPostAction = createAsyncThunk('api/createPost', async ({ auth, content, image, dispatch, socket }, { rejectWithValue }) => {
  try {
    let media;
    if (image) media = await imageUpload([image]);
    const res = await postDataAPI('post', {
      content,
      images: media ? [media[0].url] : ['']
    }, auth.userToken);
    console.log(res);

    const msg = {
      id: res.data.newPost._id,
      text: 'Đã thêm 1 bài viết mới',
      recipients: res.data.newPost.user.followers,
      url: `/post/${res.data.newPost._id}`,
      content,
      image: media[0].url
    }
    await dispatch(createNotify({ msg, auth, socket }));

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

export const likePostAction = createAsyncThunk('api/post/:id/like', async ({ auth, postItem, socket, dispatch }, { rejectWithValue }) => {
  try {
    const newPost = { ...postItem, likes: [...postItem.likes, auth.userInfo] };
    socket.socket.emit("likePost", newPost);

    await patchDataAPI(`post/${postItem._id}/like`, { id: postItem._id }, auth.userToken);

    const msg = {
      id: auth.userInfo._id,
      text: 'đã thích bài viết của bạn',
      recipients: [postItem.user._id],
      url: `/post/${postItem._id}`,
      content: postItem.content,
      image: postItem.images[0].url
    }

    await dispatch(createNotify({ msg, auth, socket }))

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

export const unLikePostAction = createAsyncThunk('api/post/:id/unlike', async ({ auth, postItem, socket, dispatch }, { rejectWithValue }) => {
  try {
    const newPost = { ...postItem, likes: postItem.likes.filter(like => like._id !== auth.userInfo._id) }
    socket.socket.emit("unLikePost", newPost);

    await patchDataAPI(`post/${postItem._id}/unlike`, { id: postItem._id }, auth.userToken);

    const msg = {
      id: auth.userInfo._id,
      text: 'đã thích bài viết của bạn',
      recipients: [postItem.user._id],
      url: `/post/${postItem._id}`,
    }
    await dispatch(removeNotify({ msg, auth, socket }))


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


export const deletePostAction = createAsyncThunk('api/post/:id/delete', async ({ auth, id, dispatch, socket }, { rejectWithValue }) => {
  try {
    const res = await deleteDataAPI(`post/${id}`, auth.userToken);
    const msg = {
      id: auth.userInfo._id,
      text: 'đã thêm một bài viết mới',
      recipients: res.data.newPost.user.followers,
      url: `/post/${res.data.newPost._id}`,
    }
    await dispatch(removeNotify({ msg, auth, socket }))
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