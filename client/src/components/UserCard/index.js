import React from 'react';
import { Link } from 'react-router-dom';
import "../Avatar";
import Avatar from '../Avatar';
import "./index.scss";

function UserCard({ children, user, border, handleClose, setShowFollowers, setShowFollowing, msg }) {
  const handleCloseAll = () => {
    if (handleClose) handleClose()
    if (setShowFollowers) setShowFollowers(false)
    if (setShowFollowing) setShowFollowing(false)

  }

  return (
    <div className='userCard'>
      <div className='px-3 py-2'>
        <Link to={`/profile/${user._id}`} onClick={handleCloseAll}
          className="d-flex align-items-center text-decoration-none">

          <Avatar src={user.avatar} size='small' />

          <div className="ms-2" style={{ transform: 'translateY(-2px)' }}>
            <span className="d-block fw-semibold text-black">{user.username}</span>
            <span className='text-secondary'>{user.fullName}</span>
          </div>
        </Link>
      </div>
      {children}
    </div>
  )
}

export default UserCard;