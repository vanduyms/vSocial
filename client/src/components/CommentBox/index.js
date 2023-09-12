import React, { useState } from 'react';
import Avatar from '../Avatar';
import "./index.scss";

function CommentBox({ auth }) {
  const user = JSON.parse(auth.userInfo);
  const [content, setContent] = useState("");

  return (
    <form className='commentBox w-100'>
      <div className='commentBox__container d-flex w-100 align-items-center'>
        <Avatar src={user?.avatar} size="small-40" />

        <div className='boxText w-100 rounded-5 d-flex align-items-center justify-content-between'>
          <input type="text" value={content} className='border-0 w-100 py-2 px-3 bg-transparent' onChange={e => setContent(e.target.value)} />

          <ul className='commentBox__container--action list-unstyled d-flex align-items-center justify-content-center'>

            <li className='action__item' hidden={!(content.length > 0)}>
              <button className='btn btn--comment__post' >Đăng</button>
            </li>

            <li className='action__item'>
              <span className="material-symbols-outlined">
                mood
              </span>
            </li>
            <li className='action__item'>
              <span className="material-symbols-outlined">
                photo_camera
              </span>
            </li>
            <li className='action__item'>
              <span className="material-symbols-outlined">
                gif_box
              </span>
            </li>
          </ul>
        </div>
      </div>
    </form>
  )
}

export default CommentBox;