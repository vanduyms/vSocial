import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { DeleteData } from "../data";

export const getProfileUser = createAsyncThunk(
  'api/user/:id',
  async ({ id, auth }, { rejectWithValue }) => {
    try {
      const res_user = await getDataAPI(`user/${id}`, auth.userToken);

      const res_post = await getDataAPI(`user_posts/${id}`, auth.userToken);

      let posts = res_post.data.posts;
      let user = res_user.data.user;

      return { posts, user }

    } catch (error) {
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.response);
      }
    }
  }
)

export const updateProfileUser = createAsyncThunk(
  'api/user',
  async ({ auth, userData, avatar }, { rejectWithValue }) => {
    try {
      let media;
      if (avatar) media = await imageUpload([avatar]);

      console.log(userData);
      const res = await patchDataAPI("user", {
        ...userData,
        avatar: media ? media[0].url : auth.userInfo.avatar
      }, auth.userToken);

      return res.data;
    } catch (error) {
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.response);
      }
    }
  }
)

export const followUser = createAsyncThunk(
  'api/:id/follow',
  async ({ users, user, auth, socket }, { rejectWithValue }) => {
    try {
      let newUser;

      if (users.every(item => item._id !== user._id)) {
        newUser = { ...user, followers: [...user.followers, auth.userInfo] }
      } else {
        users.forEach(item => {
          if (item._id === user._id) {
            newUser = { ...item, followers: [...item.followers, auth.userInfo] }
          }
        })
      };

      const newAuthInfo = { ...auth.userInfo, following: [...auth.userInfo.following, newUser] }
      const info = { newAuthInfo, newUser };

      socket.socket.emit('follow', info);

      await patchDataAPI(`/user/${user._id}/follow`, { id: user._id }, auth.userToken);
      return newUser;
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.response);
      }
    }
  }
)

export const unfollowUser = createAsyncThunk(
  'api/:id/unfollow',
  async ({ users, user, auth, socket }, { rejectWithValue }) => {
    try {
      let newUser;

      if (users.every(item => item._id !== user._id)) {
        newUser = { ...user, followers: DeleteData(user.followers, auth.userInfo._id) }
      } else {
        users.forEach(item => {
          if (item._id === user._id) {
            newUser = { ...item, followers: DeleteData(item.followers, auth.userInfo._id) }
          }
        })
      }

      const newAuthInfo = { ...auth.userInfo, following: DeleteData(auth.userInfo.following, user._id) };

      const info = { newAuthInfo, newUser }

      await patchDataAPI(`/user/${user._id}/unfollow`, { id: user._id }, auth.userToken);
      socket.socket.emit('unfollow', info);
      return newUser;
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.response);
      }
    }
  }
)