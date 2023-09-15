import React from 'react';
import "./index.scss";
import PostCard from "../PostCard/index";
import CommentBox from '../CommentBox';
import { useSelector } from 'react-redux';
import { useClickOutSide } from '../../hook/useToggle';

function PostDetail({ postItem, setShowDetail }) {
  const { auth } = useSelector(state => state);
  const [refOutside] = useClickOutSide({ "onClickOutside": () => setShowDetail(false) });

  return (
    <div className='postDetail'>
      <div className='postDetail--container rounded-3' ref={refOutside}>
        <div className='postDetail--container__head px-3 py-2 text-center'>
          <p className='fw-bold fs-4'>Bài viết</p>
          <button
            type="button"
            className="close btn_close rounded-circle fs-5 p-2 d-flex align-items-center justify-content-center"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => setShowDetail(false)}
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        <div className='postDetail--container__body'>
          <PostCard postItem={postItem} />
        </div>

        <div className='postDetail--container__comment px-3 py-2'>
          <CommentBox auth={auth} />
        </div>

      </div>

    </div>
  )
}

export default PostDetail;