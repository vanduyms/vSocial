import React, { useState } from 'react';
import Avatar from '../Avatar';
import "./index.scss";

function CommentBox() {
  const [content, setContent] = useState("");

  return (
    <form className='commentBox w-100'>
      <div className='commentBox__container d-flex w-100 align-items-center'>
        <div className='action__item d-flex align-items-center'>
          <span className="material-icons">
            mood
          </span>
        </div>
        <input type="text" value={content} className='border-0 w-100 py-2 px-2 bg-transparent' onChange={e => setContent(e.target.value)} placeholder="Thêm bình luận ..." />

        <button className='btn btn--comment__post text-primary fw-bold bg-transparent' disabled={!content}>Đăng</button>
      </div>
    </form >
  )
}

export default CommentBox;