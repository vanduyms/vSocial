import React from 'react'
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import "./index.scss";

function CardHeader({ user }) {
  return (
    <div className='card__header w-100 d-flex justify-content-between p-1'>
      <div className='card__header--left d-flex align-items-center'>
        <Link to={`/profile/${user._id}`} >
          <Avatar src={user.avatar} size="small-32" />
        </Link>

        <div className='card__name'>
          <h6 className="m-0 ">
            <Link to={`/profile/${user._id}`} className="text-dark text-decoration-none">
              {user.fullName}
            </Link>
          </h6>
          <small className="text-muted">
            {/* {moment(post.createdAt).fromNow()} */}
          </small>
        </div>
      </div>

      <div className="card__header--right nav-item dropdown d-flex align-items-center">
        <span className="material-icons" id="moreLink" data-toggle="dropdown">
          more_horiz
        </span>
      </div>

    </div>
  )
}

export default CardHeader;