import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData";
import { DeleteData, EditData } from "../data";
import { createNotify, removeNotify } from "./notifyAction";

export const createCommentAction = createAsyncThunk('api/comment', async ({ post, newComment, auth, socket, dispatch }, { rejectWithValue }) => {
  try {
    const data = { ...newComment, postId: post._id, postUserId: post.user._id }
    const res = await postDataAPI('comment', data, auth.userToken);

    const newData = { ...res.data.newComment, user: auth.userInfo };
    const newPost = { ...post, comments: [...post.comments, newData] };

    socket.socket.emit('createComment', newPost);

    // Notify
    const msg = {
      id: res.data.newComment._id,
      text: newComment.reply ? 'đã nhắc đến bạn trong một bình luận' : 'đã bình luận về bài viết của bạn',
      recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
      url: `/post/${post._id}`,
      content: post.content,
      image: post.images[0].url
    }
    dispatch(createNotify({ msg, auth, socket }));

    return newPost;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data.msg);
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const updateCommentAction = createAsyncThunk('api/comment/:id/update', async ({ comment, post, content, auth }, { rejectWithValue }) => {
  try {
    const newComment = EditData(post.comments, comment._id, { ...comment, content });
    const newPost = { ...post, comments: newComment };

    await patchDataAPI(`comment/${comment._id}`, { content }, auth.userToken);

    return newPost;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data.msg);
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const likeCommentAction = createAsyncThunk('api/comment/:id/like', async ({ comment, post, auth }, { rejectWithValue }) => {
  try {
    const newComment = { ...comment, likes: [...comment.likes, auth.userInfo] };
    const newComments = EditData(post.comments, comment._id, newComment)
    const newPost = { ...post, comments: newComments };

    await patchDataAPI(`comment/${comment._id}/like`, null, auth.userToken);

    return newPost;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data.msg);
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const unLikeCommentAction = createAsyncThunk('api/comment/:id/unlike', async ({ comment, post, auth }, { rejectWithValue }) => {
  try {
    const newComment = { ...comment, likes: DeleteData(comment.likes, auth.userInfo._id) };
    const newComments = EditData(post.comments, comment._id, newComment)
    const newPost = { ...post, comments: newComments };

    await patchDataAPI(`comment/${comment._id}/unlike`, null, auth.userToken);

    return newPost;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data.msg);
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const deleteCommentAction = createAsyncThunk('api/comment/:id/delete', async ({ comment, post, auth, socket, dispatch }, { rejectWithValue }) => {
  try {
    const deleteArr = [...post.comments.filter(cm => cm.reply === comment._id), comment];
    const newPost = {
      ...post,
      comments: post.comments.filter(cm => !deleteArr.find(da => cm._id === da._id))
    };

    deleteArr.forEach(async item => {
      await deleteDataAPI(`comment/${item._id}`, auth.userToken);

      const msg = {
        id: item._id,
        text: comment.reply ? 'đã nhắc đến bạn trong một bình luận' : 'đã bình luận về bài viết của bạn',
        recipients: comment.reply ? [comment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
      }

      dispatch(removeNotify({ msg, auth, socket }))
    });

    socket.socket.emit('deleteComment', newPost);

    return newPost;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data.msg)
    } else {
      return rejectWithValue(error.response);
    }
  }
});