import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCommentAction } from '../../redux/actions/commentAction'

function CommentMenu({ post, comment, setOnEdit }) {
  const { auth, socket } = useSelector(state => state)
  const dispatch = useDispatch()

  const handleRemove = () => {
    if (post.user?._id === auth.userInfo._id || comment.user?._id === auth.userInfo._id) {
      dispatch(deleteCommentAction({ comment, post, auth, socket }))
    }
  }

  const MenuItem = () => {
    return (
      <>
        <div className="dropdown-item" onClick={() => setOnEdit(true)}>
          <span className="material-icons">create</span> Chỉnh sửa
        </div>
        <div className="dropdown-item" onClick={handleRemove}>
          <span className="material-icons">delete_outline</span> Xóa
        </div>
      </>
    )
  }


  return (
    <div className="menu">
      {
        (post.user[0]._id === auth.userInfo._id || comment.user?._id === auth.userInfo._id) &&
        <div className="nav-item dropdown">
          <span className="material-icons  d-flex align-items-center" id="moreLink" data-bs-toggle="dropdown">
            more_vert
          </span>

          <div className="dropdown-menu" aria-labelledby="moreLink">
            {
              post.user[0]._id === auth.userInfo._id
                ? comment.user?._id === auth.userInfo._id
                  ? MenuItem()
                  : <div className="dropdown-item" onClick={handleRemove}>
                    <span className="material-icons">delete_outline</span> Xóa bỏ
                  </div>
                : comment.user?._id === auth.userInfo._id && MenuItem()
            }
          </div>

        </div>
      }

    </div>
  )
}

export default CommentMenu;