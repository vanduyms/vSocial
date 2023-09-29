import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Avatar from "../Avatar";
import { formatDistanceToNow } from "date-fns";
import "./index.scss";
import CommentBox from '../CommentBox';
import CommentMenu from '../CommentMenu';
import LikeButton from '../LikeButton';
import { likeCommentAction, unLikeCommentAction, updateCommentAction } from '../../redux/actions/commentAction';

function CommentCard({ children, comment, post, commentId }) {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [readMore, setReadMore] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [onReply, setOnReply] = useState(false);

  const handleReply = () => {
    if (onReply) return setOnReply(false)
    setOnReply({ ...comment, commentId });
  }

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);

    setLoadLike(true);
    await dispatch(likeCommentAction({ comment, post, auth }));
    setLoadLike(false)
  }

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);

    setLoadLike(true);
    await dispatch(unLikeCommentAction({ comment, post, auth }));
    setLoadLike(false)
  }

  const handleUpdate = async () => {
    await dispatch(updateCommentAction({ comment, post, content, auth }));
    setOnEdit(false);
  }

  useEffect(() => {
    setContent(comment.content)
    setIsLike(false)
    setOnReply(false)
    if (comment.likes.find(like => like._id === auth.userInfo._id)) {
      setIsLike(true)
    }
  }, [comment, auth.userInfo._id]);

  const calculateDate = (date) => {
    const targetDate = new Date(date);

    const formattedDistance = formatDistanceToNow(targetDate, { addSuffix: true });

    return formattedDistance;
  };

  return (
    <div className="comment__card mt-2 d-flex flex-column">
      <div className='d-flex align-items-center'>
        <Avatar src={comment.user?.avatar} size="small-32" />

        <div className='comment__card--container'>
          <div className="comment__content">
            <div className='comment__content--head d-flex align-items-center'>
              <Link className="mx-1 fw-bold">{comment.user?.username}</Link>
              {
                onEdit
                  ? <textarea rows="1" value={content} className="border w-100 rounded-3"
                    onChange={e => setContent(e.target.value)} />

                  : <div>
                    {
                      comment.tag && comment.tag?._id !== comment.user?._id &&
                      <Link to={`/profile/${comment.tag._id}`} className="mr-1">
                        @{comment.tag.username}
                      </Link>
                    }
                    <span>
                      {
                        content.length < 100 ? content :
                          readMore ? content + ' ' : content.slice(0, 100) + '....'
                      }
                    </span>
                    {
                      content.length > 100 &&
                      <span className="readMore" onClick={() => setReadMore(!readMore)}>
                        {readMore ? 'Ẩn bớt' : 'Đọc thêm'}
                      </span>
                    }
                  </div>
              }
            </div>
            <div className="d-flex comment__content--action">
              <div style={{ cursor: 'pointer' }}>
                <small className="text-muted mr-3 ml-1">
                  {calculateDate(comment.createdAt)}
                </small>

                <small className="font-weight-bold mr-3">
                  {comment.likes.length} lượt thích
                </small>

                {
                  onEdit
                    ? <>
                      <small className="font-weight-bold mr-3"
                        onClick={handleUpdate}>
                        Cập nhật
                      </small>
                      <small
                        className="font-weight-bold mr-3"
                        onClick={() => {
                          setOnEdit(false);
                          setContent(comment.content)
                        }}>
                        Hủy
                      </small>
                    </>

                    : <small className="font-weight-bold mr-3"
                      onClick={handleReply}>
                      {onReply ? 'Hủy' : 'Trả lời'}
                    </small>
                }

              </div>

            </div>
          </div>

          {
            onReply &&
            <CommentBox post={post} onReply={onReply} setOnReply={setOnReply} >
              <Link to={`/profile/${onReply.user?._id}`} className="mr-1">
                @{onReply.user.username}:
              </Link>
            </CommentBox>
          }
        </div>

        <div className="comment__card--action d-flex align-items-center ml-3" style={{ cursor: 'pointer' }}>
          <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
          <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
        </div>
      </div>
      {children}
    </div>
  )
}

export default CommentCard;