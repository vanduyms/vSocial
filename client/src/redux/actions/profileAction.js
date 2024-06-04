import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { DeleteData } from "../data";
import { createNotify, removeNotify } from "./notifyAction";

export const getProfileUser = createAsyncThunk(
  'api/user/:id',
  async ({ id, auth }, { rejectWithValue }) => {
    try {
      const res_user = await getDataAPI(`user/${id}`, auth.userToken);

      const res_post = await getDataAPI(`user_posts/${id}?page=1&limit=9`, auth.userToken);

      let posts = res_post.data;
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
  'api/user/:id/update',
  async ({ auth, userData, avatar }, { rejectWithValue }) => {
    try {
      let media;
      if (avatar) media = await imageUpload([avatar]);

      await patchDataAPI("user", {
        ...userData,
        avatar: media ? media[0].url : auth.userInfo.avatar
      }, auth.userToken);

      const userInfo = { ...auth.userInfo, ...userData, avatar: media ? media[0].url : auth.userInfo.avatar };

      return userInfo;
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
  async ({ users, user, auth, socket, dispatch }, { rejectWithValue }) => {
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

      await patchDataAPI(`/ user / ${user._id} / follow`, { id: user._id }, auth.userToken);

      // Notify
      const msg = {
        id: auth.userInfo._id,
        text: 'đã bắt đầu theo dõi bạn',
        recipients: [newUser._id],
        url: `/ profile / ${auth.userInfo._id}`,
      }

      dispatch(createNotify({ msg, auth, socket }))
      return newUser;
    } catch (error) {
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
  async ({ users, user, auth, socket, dispatch }, { rejectWithValue }) => {
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

      await patchDataAPI(`/ user / ${user._id} / unfollow`, { id: user._id }, auth.userToken);
      socket.socket.emit('unfollow', info);

      // Notify
      const msg = {
        id: auth.userInfo._id,
        text: 'đã bắt đầu theo dõi bạn',
        recipients: [newUser._id],
        url: `/ profile / ${auth.userInfo._id}`,
      }

      dispatch(removeNotify({ msg, auth, socket }))

      return newUser;
    } catch (error) {
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.response);
      }
    }
  }
)