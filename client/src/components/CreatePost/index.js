import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import CreatePostBox from '../CreatePostBox';
import "./index.scss";

function CreatePost() {
  const [onShowBox, setShowBox] = useState(false);
  const { auth } = useSelector(state => state);


  return (
    <div className='create-post d-flex flex-column align-items-center justify-content-center p-3 rounded-3'>
      <div className='create-post__top d-flex align-items-center justify-content-between w-100'>
        <Link to={`/profile/${auth.userInfo?._id}`} >
          <Avatar src={auth.userInfo?.avatar} size="small-32" />
        </Link>

        <input type="button" value='Bạn đang nghĩ gì?' className='w-100 rounded-5 border-0 p-1 px-3' onClick={() => setShowBox(true)} />
      </div>

      <div className='line w-100 my-2'></div>

      <div className='create-post__bottom d-flex align-items-center justify-content-between w-100'>
        <button className='btn btn-light d-flex align-items-center justify-content-center w-50 mx-1' onClick={() => setShowBox(true)}>
          <span className="material-icons text-danger" id="moreLink" data-toggle="dropdown">
            live_tv
          </span>
          Phát trực tiếp
        </button>
        <button className='btn btn-light d-flex align-items-center justify-content-center w-50 mx-1' onClick={() => setShowBox(true)}>
          <span className="material-icons text-success" id="moreLink" data-toggle="dropdown">
            image
          </span>
          Ảnh/video
        </button>
      </div>

      {onShowBox && <CreatePostBox setShowCreateBox={setShowBox} user={auth.userInfo} />}
    </div>
  )
}

export default CreatePost;