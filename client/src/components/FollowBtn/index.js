import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { followUser, getProfileUser, unfollowUser } from '../../redux/actions/profileAction';

function FollowBtn({ setOnEdit }) {
  const { auth, profile } = useSelector(state => state);
  const { id } = useParams();

  const [followed, setFollowed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(getProfileUser({ id, auth }));
        const followers = profile?.followers;
        if (followers) {
          setFollowed(followers.some(user => user._id === JSON.parse(auth.userInfo)._id))
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