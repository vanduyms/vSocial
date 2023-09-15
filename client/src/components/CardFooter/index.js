/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import "./index.scss";
import { useDispatch, useSelector } from 'react-redux';
import { likePostAction, unLikePostAction } from '../../redux/actions/postAction';
import CommentBox from '../CommentBox';

function CardFooter({ post }) {
  const [liked, setLiked] = useState(false);
  const { auth } = useSelector(state => state);

  useEffect(() => {
    if (post.likes.includes(auth.userInfo._id))
      setLiked(true);
    else setLiked(false);
  }, [auth, liked, post]);

  const dispatch = useDispatch();

  const handleLike = async (e) => {
    e.preventDefault();
    const id = post._id;
    await dispatch(likePostAction({ auth, id }));
  }

  const handleUnLike = async (e) => {
    e.preventDefault();
    const id = post._id;
    await dispatch(unLikePostAction({ auth, id }));
  }
  return (
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
          <li className='action--item d-flex'>
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

          {/* <span className="material-symbols-outlined text-warning">
            bookmark
          </span> */}
        </a>
      </div>

      <div className='card__footer--info d-flex justify-content-between align-items-center'>
        <div className='card__likes'>
          <strong>{post.likes.length} lượt thích</strong>
        </div>

        <div className='card__comments'>
          <strong>{post.comments.length} bình luận</strong>
        </div>
      </div>

      {/* <div className='postDetail--container__comment'>
          <CommentBox auth={auth} />
        </div> */}
    </div>
  )
}

export default CardFooter;