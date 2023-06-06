import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";

export const getProfileUser = createAsyncThunk(
  'api/user/:id',
  async ({ id, auth }, { rejectWithValue }) => {
    try {
      const res = await getDataAPI(`user/${id}`, auth.userToken);
      return res;
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
  async ({ id, auth, userData, avatar }, { rejectWithValue }) => {
    try {
      let media;
      if (avatar) media = await imageUpload([avatar]);
      console.log(media[0]);

      const res = await patchDataAPI("/user", {
        ...userData,
        avatar: media ? media[0].url : auth.userInfo.avatar
      }, auth.userToken);

      return res;
    } catch (error) {
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.response);
      }
    }
  }
)