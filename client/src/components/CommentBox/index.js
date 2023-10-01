import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction } from '../../redux/actions/commentAction';
import "./index.scss";

function CommentBox({ children, post, onReply, setOnReply }) {
  const [content, setContent] = useState("");
  const { auth, socket } = useSelector(state => state);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    setContent('');

    const newComment = {
      content,
      likes: [],
      user: auth.userInfo,
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
      createAt: new Date().toISOString()
    }

    dispatch(createCommentAction({ post, newComment, auth, socket, dispatch }));

    if (setOnReply) return setOnReply(false);
  }

  return (
    <form className='commentBox w-100'>
      {children}
      <div className='commentBox__container d-flex w-100 align-items-center'>
        <div className='action__item d-flex align-items-center'>
          <span className="material-icons">
            mood
          </span>
        </div>
        <input type="text" value={content} className='border-0 w-100 py-2 px-2 bg-transparent' onChange={e => setContent(e.target.value)} placeholder="Thêm bình luận ..." />

        <button className='btn btn--comment__post text-primary fw-bold bg-transparent' disabled={!content} onClick={handleSubmit}>Đăng</button>
      </div>
    </form >
  )
}

export default CommentBox;