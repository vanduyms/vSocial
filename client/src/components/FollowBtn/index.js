import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { followUser, unfollowUser } from '../../redux/actions/profileAction';
import { updateUserInfo } from '../../redux/reducers/authReducer';

function FollowBtn({ setOnEdit }) {
  const { auth } = useSelector(state => state);
  const { id } = useParams();
  const [followed, setFollowed] = useState(JSON.parse(auth.userInfo).following.some(user => user._id === id));

  const dispatch = useDispatch();

  const handleClick = async () => {
    if (!followed) {
      const res = await dispatch(followUser({ id, auth }));
      console.log(res);
    } else {
      const res = await dispatch(unfollowUser({ id, auth }));
      await updateUserInfo(res);
    }
  }

  return (
    <div>
      {(JSON.parse(auth.userInfo)._id === id)
        ?
        <button
          className='editBtn btn btn-outline-info'
          onClick={() => setOnEdit(true)}
        >
          Edit Profile
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