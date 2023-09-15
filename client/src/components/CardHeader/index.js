/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { formatDistanceToNow } from "date-fns";
import { Link, useParams } from 'react-router-dom';
import Avatar from '../Avatar';
import "./index.scss";
import { useDispatch, useSelector } from 'react-redux';
import { deletePostAction, getPostsAction, getUserPostsAction } from '../../redux/actions/postAction';
import CreatePostBox from '../CreatePostBox';

function CardHeader({ postItem }) {
  const { auth, post } = useSelector(state => state);
  const [showUpdateBox, setShowUpdateBox] = useState(false);

  const dispatch = useDispatch();

  const user = postItem?.user[0];

  const calculateDate = (date) => {
    const targetDate = new Date(date);

    const formattedDistance = formatDistanceToNow(targetDate, { addSuffix: true });

    return formattedDistance;
  };

  let id = postItem?._id;
  const urlParams = useParams();


  const handleDelete = async () => {
    await dispatch(deletePostAction({ auth, id }));

    id = urlParams?.id;

    !urlParams ? await dispatch(getPostsAction({ auth })) : await dispatch(getUserPostsAction({ auth, id }));
  }

  return (
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
  )
}

export default CardHeader;