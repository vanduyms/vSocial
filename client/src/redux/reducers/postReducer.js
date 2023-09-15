const { createSlice } = require("@reduxjs/toolkit")
const { createPostAction, getPostsAction, likePostAction, unLikePostAction, getUserPostsAction, deletePostAction, updatePostAction } = require("../actions/postAction")

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
    // createPost: (state, action) => {
    //   state.posts = [action.payload, ...state.posts]
    // },
    // setLoading: (state, action) => {
    //   state.loading = action.payload;
    // },
    // getPosts: (state, action) => {
    //   state.posts = action.payload.posts;
    //   state.result = action.payload.result;
    //   state.page = action.payload.page;
    // },
    // updatePost: (state, action) => {
    //   const { _id, ...newData } = action.payload;
    //   const postIndex = state.posts.findIndex((post) => post._id === _id);
    //   if (postIndex !== -1) {
    //     state.posts[postIndex] = { ...state.posts[postIndex], ...newData };
    //   }
    // },
    // deletePost: (state, action) => {
    //   const { _id } = action.payload;
    //   state.posts = state.posts.filter((post) => post._id !== _id);
    // },
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
    [getUserPostsAction.pending]: (state) => {
      state.loading = true
    },
    [getUserPostsAction.fulfilled]: (state, { payload }) => {
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
    },
    [deletePostAction.pending]: (state) => {
      state.loading = true
    },
    [deletePostAction.fulfilled]: (state) => {
      state.loading = false
    },
    [updatePostAction.pending]: (state) => {
      state.loading = true
    },
    [updatePostAction.fulfilled]: (state) => {
      state.loading = false
    }
  }
});

// export const {
//   createPost,
//   setLoading,
//   getPosts,
//   updatePost,
//   deletePost
// } = postSlice.actions;
export default postSlice.reducer;