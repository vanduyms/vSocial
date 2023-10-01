const { createSlice } = require("@reduxjs/toolkit")
const { getDiscoverPosts } = require("../actions/discoverAction")

const initialState = {
  loading: false,
  posts: [],
  result: 9,
  page: 2,
  firstLoad: false
}

const discoverReducer = createSlice({
  name: "discover",
  initialState,
  reducers: {
    update: (state, { payload }) => {
      state.posts = payload.posts
      state.result = payload.result
      state.page = state.page + 1
    }
  },
  extraReducers: {
    [getDiscoverPosts.pending]: (state) => {
      state.loading = false
    },
    [getDiscoverPosts.fulfilled]: (state, { payload }) => {
      state.loading = true
      state.posts = [...payload.posts]
      state.result = payload.result
      state.firstLoad = true
    }

  }
})

export default discoverReducer.reducer;