const { createAsyncThunk } = require("@reduxjs/toolkit");
const { imageUpload } = require("../../utils/imageUpload");
const { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI } = require("../../utils/fetchData");

export const createPostAction = createAsyncThunk('api/post', async ({ auth, content, image, socket }, { rejectWithValue }) => {
  try {
    let media;
    if (image) media = await imageUpload([image]);
    const res = await postDataAPI('post', {
      content,
      images: media ? [media[0].url] : ['']
    }, auth.userToken);

    return res;
  } catch (error) {
    if (error.response && error.response.data.msg) return rejectWithValue(error.response.data.msg);
    else return rejectWithValue(error.response);
  }
});

export const getPostsAction = createAsyncThunk('api/post', async ({ auth }, { rejectWithValue }) => {
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

export const getUserPostsAction = createAsyncThunk('api/post', async ({ auth, id }, { rejectWithValue }) => {
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

export const likePostAction = createAsyncThunk('api/post/:id/like', async ({ auth, postItem, socket }, { rejectWithValue }) => {
  try {
    const newPost = { ...postItem, likes: [...postItem.likes, auth.user] };
    socket.emit("likePost", newPost);

    const res = await patchDataAPI(`post/${postItem._id}/like`, { id: postItem._id }, auth.userToken);
    return res;
  } catch (error) {
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
    socket.emit("unLikePost", newPost);

    const res = await patchDataAPI(`post/${postItem._id}/unlike`, { id: postItem._id }, auth.userToken);
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


export const deletePostAction = createAsyncThunk('api/post/:id', async ({ auth, id }, { rejectWithValue }) => {
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

export const updatePostAction = createAsyncThunk('api/post/:id', async ({ auth, content, image, id }, { rejectWithValue }) => {
  try {
    const res = await patchDataAPI(`post/${id}`, { content, image }, auth.userToken);
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