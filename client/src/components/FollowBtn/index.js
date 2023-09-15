import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { followUser, getProfileUser, unfollowUser } from '../../redux/actions/profileAction';

function FollowBtn({ setOnEdit }) {
  const { auth, profile } = useSelector(state => state);
  const { id } = useParams();

  const [followed, setFollowed] = useState(false);
  const dispatch = useDispatch();

  const userInfo = typeof auth.userInfo === "string" ? JSON.parse(auth.userInfo) : auth.userInfo;

  useEffect(() => {
    const loadData = () => {
      try {
        const followers = profile?.followers;
        if (!followers) {
          dispatch(getProfileUser({ id, auth }));
        } else {
          setFollowed(followers.some(user => user._id === userInfo._id));
        }
      } catch (error) {
      }
    };

    loadData();
  }, [id, auth, dispatch, profile?.followers])


  const handleClick = async () => {
    if (!followed) {
      await dispatch(followUser({ id, auth }));
      await dispatch(getProfileUser(id, auth));
    } else {
      await dispatch(unfollowUser({ id, auth }));
      await dispatch(getProfileUser(id, auth));

    }
  }

  return (
    <div>
      {
        userInfo._id === id
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