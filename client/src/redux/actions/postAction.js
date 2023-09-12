const { createAsyncThunk } = require("@reduxjs/toolkit");
const { imageUpload } = require("../../utils/imageUpload");
const { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI } = require("../../utils/fetchData");

export const createPostAction = createAsyncThunk('api/post', async ({ auth, content, image }, { rejectWithValue }) => {
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

export const likePostAction = createAsyncThunk('api/post/:id/like', async ({ auth, id }, { rejectWithValue }) => {
  try {
    const res = await patchDataAPI(`post/${id}/like`, { id: id }, auth.userToken);
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

export const unLikePostAction = createAsyncThunk('api/post/:id/unlike', async ({ auth, id }, { rejectWithValue }) => {
  try {
    const res = await patchDataAPI(`post/${id}/unlike`, { id: id }, auth.userToken);
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