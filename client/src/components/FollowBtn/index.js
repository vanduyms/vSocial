import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../redux/actions/profileAction';

function FollowBtn({ setOnEdit, user }) {
  const [followed, setFollowed] = useState(false);
  const [load, setLoad] = useState(false);
  const { auth, socket, profile } = useSelector(state => state);

  const id = user._id;
  const dispatch = useDispatch();

  useEffect(() => {
    setFollowed(user?.followers.some(user => user._id === auth.userInfo._id));
  }, [auth, dispatch, user]);

  const handleFollow = async () => {
    if (load) return;

    setFollowed(true)
    setLoad(true)
    await dispatch(followUser({ users: profile.users, user, auth, socket, dispatch }));
    setLoad(false)
  }

  const handleUnFollow = async () => {
    if (load) return;

    setFollowed(false)
    setLoad(true)
    await dispatch(unfollowUser({ users: profile.users, user, auth, socket, dispatch }));
    setLoad(false)
  }

  const handleClick = () => {
    if (!followed) {
      handleFollow();
    } else {
      handleUnFollow();
    }
  }

  return (
    <div>
      {
        auth.userInfo._id === id
          ?
          <button
            className='editBtn btn btn-outline-info'
            onClick={() => setOnEdit(true)}
          >
            Chỉnh sửa trang cá nhân
          </button> :
          <button
            className='editBtn btn btn-outline-info'
            onClick={handleClick}
          >
            {followed ? "Đang theo dõi" : "Theo dõi"}
          </button>
      }
    </div>
  )
}

export default FollowBtn;