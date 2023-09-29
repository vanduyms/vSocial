/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar';
import EditProfile from '../EditProfile';
import Follower from '../Follower';
import FollowBtn from '../FollowBtn';
import "./index.scss";

function Info({ auth, profile, id, dispatch }) {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [onShowFollower, setOnShowFollower] = useState(false);
  const [onShowFollowing, setOnShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.userInfo._id) {
      setUserData([auth.userInfo])
    } else {
      const newData = profile.users.filter(user => user._id === id);
      setUserData(newData)
    }
  }, [id, auth, dispatch, profile.users]);


  return (
    <div className='info m-5 d-flex flex-column align-items-center'>
      {userData.map(user => (
        <div className='info__container d-flex' key={user._id}>
          <div className='info__avatar d-flex align-items-center rounded-circle'>
            <Avatar src={user.avatar} size="very-big" />
          </div>

          <div className='info__content'>
            <div className='info__content--title d-flex align-items-center'>
              <h2 className='username'>{user.username}</h2>
              <FollowBtn setOnEdit={setOnEdit} user={user} />
            </div>

            <div className='info__content--sub d-flex mt-3'>
              {/* <p className='item'><span className='fw-semibold'>{user.posts.length}</span> Post</p> */}

              <a className='item' onClick={() => setOnShowFollower(!onShowFollower)}>
                <span className='fw-semibold'>
                  {user?.followers.length}
                </span> Người theo dõi
              </a>

              <a className='item' onClick={() => setOnShowFollowing(!onShowFollowing)}>
                <span className='fw-semibold'>
                  {user?.following.length}
                </span> Đang theo dõi
              </a>
            </div>

            <div className='info__content--detail'>
              <h6>{user.fullName}</h6>
              <p>{user.bio}</p>
              <h6 >{user.email}</h6>
            </div>
          </div>
          {onShowFollower && <Follower title="Người theo dõi" data={user.followers} setShow={setOnShowFollower} auth={auth} />}
          {onShowFollowing && <Follower title="Đang theo dõi" data={user.following} setShow={setOnShowFollowing} />}
          {onEdit && <EditProfile setOnEdit={setOnEdit} user={user} />}
        </div>
      ))}

    </div>
  )
}

export default Info;