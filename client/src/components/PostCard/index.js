/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { formatDistanceToNow } from "date-fns";
import CreatePostBox from '../CreatePostBox';
import "./index.scss";
import { Link, useParams } from 'react-router-dom';
import { deletePostAction, getPostsAction, getUserPostsAction, likePostAction, unLikePostAction } from '../../redux/actions/postAction';
import Avatar from '../Avatar';
import PostDetail from '../PostDetail';
import Follower from "../Follower";

function PostCard({ postItem }) {
  const [liked, setLiked] = useState(false);
  const { auth, post, socket } = useSelector(state => state);
  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showUserLikes, setShowUserLikes] = useState(false);

  const dispatch = useDispatch();

  const userInfo = typeof auth.userInfo === "string" ? JSON.parse(auth.userInfo) : auth.userInfo;

  useEffect(() => {
    if (postItem.likes.find((value) =>
      userInfo._id === value._id
    ))
      setLiked(true);
    else setLiked(false);
  }, [auth, liked, postItem]);

  const user = postItem?.user[0];

  const calculateDate = (date) => {
    const targetDate = new Date(date);

    const formattedDistance = formatDistanceToNow(targetDate, { addSuffix: true });

    return formattedDistance;
  };

  let id = postItem?._id;
  const urlParams = useParams();

  const handleLike = async (e) => {
    e.preventDefault();
    await dispatch(likePostAction({ auth, postItem, socket }));

    id = urlParams?.id;
    !Object.keys(urlParams).length > 0 ? await dispatch(getPostsAction({ auth })) : await dispatch(getUserPostsAction({ auth, id }));
  }

  const handleUnLike = async (e) => {
    e.preventDefault();
    await dispatch(unLikePostAction({ auth, postItem, socket }));

    id = urlParams?.id;

    !Object.keys(urlParams).length > 0 ? await dispatch(getPostsAction({ auth })) : await dispatch(getUserPostsAction({ auth, id }));
  }


  const handleDelete = async () => {
    await dispatch(deletePostAction({ auth, id }));

    id = urlParams?.id;

    !Object.keys(urlParams).length > 0 ? await dispatch(getPostsAction({ auth })) : await dispatch(getUserPostsAction({ auth, id }));
  }

  return (
    <div className='postcards d-flex flex-column align-items-center m-auto px-3 py-1 rounded-3 my-4'>
      <div className='card__header w-100 d-flex justify-content-between p-1'>
        <div className='card__header--left d-flex align-items-center'>
          <Link to={`/profile/${user?._id}`} >
            <Avatar src={user?.avatar} size="small-32" />
          </Link>

          <div className='card__name'>
            <h6 className="m-0 ">
              <Link to={`/profile/${user?._id}`} className="text-dark text-decoration-none">
                {user?.fullName}
              </Link>
            </h6>
            <small className="text-muted">
              {calculateDate(postItem?.createdAt)}
            </small>
          </div>
        </div>

        <a className="nav-link card__header--right" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <span className="material-icons" id="moreLink" data-toggle="dropdown">
            more_horiz
          </span>
        </a>
        <div className="dropdown-menu">
          <div className="dropdown-item">
            <span className="material-icons" id="moreLink" data-toggle="dropdown">
              bookmark_border
            </span>
            Lưu bài viết
          </div>
          {
            postItem?.user[0]?._id === auth?.userInfo._id &&
            (
              <>
                <div className='dropdown-item' data-bs-toggle="modal" data-bs-target="#modalDelete">
                  <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    delete
                  </span>
                  Xóa bài viết
                </div>
                <div className='dropdown-item' onClick={() => setShowUpdateBox(true)}>
                  <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    edit
                  </span>
                  Chỉnh sửa bài viết
                </div>
              </>
            )
          }
        </div>

        <div className="modal fade" tabIndex="-1" id="modalDelete" data-bs-backdrop="static" data-bs-keyboard="false" >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-center">Delete post</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Do you want to delete this post ?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                <button type="button" onClick={handleDelete} className="btn btn-primary" data-bs-dismiss="modal">
                  {post.loading ? 'Deleting ...' : 'Yes'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {
          showUpdateBox &&
          <CreatePostBox
            setShowCreateBox={setShowUpdateBox}
            user={user}
            data={postItem}
          />}

      </div>

      <div className='card__body w-100'>
        <div className='card__content w-100'>
          <p>{postItem?.content}</p>
        </div>

        {
          postItem?.images[0] ?
            <img
              src={postItem.images[0]}
              alt="Content"
              className='card__image'
              onClick={() => {
                setShowDetail(true);
              }} />
            :
            <div></div>
        }

      </div>

      <div className='card__footer w-100 py-2'>
        <div className='card__footer--action d-flex justify-content-between align-items-center'>
          <ul className='action--left d-flex list-unstyled align-items-center'>
            <li className='action--item d-flex' onClick={!liked ? handleLike : handleUnLike}>
              {!liked ?
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                  favorite_border
                </span>
                :
                <span className="material-symbols-outlined text-danger">
                  favorite
                </span>
              }
            </li>
            <li
              className='action--item d-flex'
              onClick={() => {
                setShowDetail(true);
              }}>
              <span className="material-icons" id="moreLink" data-toggle="dropdown">
                chat_bubble_outline
              </span>
            </li>
            <li className='action--item d-flex'>
              <span className="material-icons" id="moreLink" data-toggle="dropdown">
                share
              </span>
            </li>
          </ul>

          <a className='action--right action--item d-flex align-items-center text-decoration-none'>
            <span className="material-icons" id="moreLink" data-toggle="dropdown">
              bookmark_border
            </span>
          </a>
        </div>

        <div className='card__footer--info d-flex justify-content-between align-items-center'>
          <div className='card__likes' onClick={() => setShowUserLikes(true)}>
            <strong>{postItem.likes.length} lượt thích</strong>
          </div>

          <div
            className='card__comments'
            onClick={() => {
              setShowDetail(true);
            }}
          >
            <strong>{postItem.comments.length} bình luận</strong>
          </div>
        </div>

        {/* <div className='postDetail--container__comment'>
          <CommentBox auth={auth} />
        </div> */}
      </div>

      {showDetail && <PostDetail postItem={postItem} setShowDetail={setShowDetail} />}
      {showUserLikes && <Follower data={postItem.likes} title="Thích" setShow={setShowUserLikes} />}
    </div>
  )
}

export default PostCard;