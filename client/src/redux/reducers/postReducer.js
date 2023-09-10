const { createSlice } = require("@reduxjs/toolkit")
const { createPostAction, getPostsAction, likePostAction, unLikePostAction } = require("../actions/postAction")

const initialState = {
  loading: false,
  posts: [],
  result: 0,
  page: 2
}

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {

  },
  extraReducers: {
    [createPostAction.pending]: (state) => {
      state.loading = true
    },
    [createPostAction.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.posts = [payload.data.newPost, ...state.posts]
    },
    [getPostsAction.pending]: (state) => {
      state.loading = true
    },
    [getPostsAction.fulfilled]: (state, { payload }) => {
      state.posts = payload.data.posts
      state.result = payload.data.result
      state.loading = false
    },
    [likePostAction.pending]: (state) => {
      // state.loading = true
    },
    [likePostAction.fulfilled]: (state, { payload }) => {
      // state.loading = false
      state.posts = state.posts.map((post) => {
        if (post._id === payload.data.result._id) {
          return payload.data.result;
        }
        return post;
      });
    },
    [unLikePostAction.pending]: (state) => {
      state.loading = true
    },
    [unLikePostAction.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.posts = state.posts.map((post) => {
        if (post._id === payload.data.result._id) {
          return payload.data.result;
        }
        return post;
      })
    }
  }
});

export default postSlice.reducer;