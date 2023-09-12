import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import "./index.scss";

function UserComponent({ user, isFollow, setIsFollow }) {
  return (
    <div className='user_component'>
      <Link className='user_component-content' to={`/profile/${user._id}`}>
        <Avatar src={user.avatar} size="medium" />
        <div className='user_component-info'>
          <p>{user.username}</p>
          <span>{user.fullName}</span>
        </div>
      </Link>

      <button
        className='followBtn btn btn-outline-info'
        onClick={() => setIsFollow(!isFollow)}
      >
        {isFollow ? "Đang theo dõi" : "Theo dõi"}
      </button>
    </div>
  )
}

export default UserComponent;