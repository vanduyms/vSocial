/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfileUser } from '../../redux/actions/profileAction';
import Avatar from '../Avatar';
import EditProfile from '../EditProfile';
import Follower from '../Follower';
import FollowBtn from '../FollowBtn';
import "./index.scss";

function Info() {
  const { id } = useParams();
  const { auth, profile } = useSelector(state => state);
  const [onEdit, setOnEdit] = useState(false);
  const [onShowFollower, setOnShowFollower] = useState(false);
  const [onShowFollowing, setOnShowFollowing] = useState(false);

  const dispatch = useDispatch();

  const followers = profile?.followers;
  const following = profile?.following;

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(getProfileUser({ id, auth }));
      } catch (error) {
      }
    };

    loadData();
  }, [id, auth, dispatch]);

  return (
    <div className='info m-5 d-flex align-items-center'>
      <Avatar src={profile.user?.avatar} size="very-big" />

      <div className='info__content'>
        <div className='info__content--title d-flex align-items-center'>
          <h2 className='username'>{profile.user?.username}</h2>
          <FollowBtn setOnEdit={setOnEdit} />
        </div>

        <div className='info__content--sub d-flex mt-3'>
          {/* <p className='item'><span className='fw-semibold'>{profile.user?.posts.length}</span> Post</p> */}

          <a className='item' onClick={() => setOnShowFollower(!onShowFollower)}>
            <span className='fw-semibold'>
              {profile.user?.followers.length}
            </span> Followers
          </a>

          <a className='item' onClick={() => setOnShowFollowing(!onShowFollowing)}>
            <span className='fw-semibold'>
              {profile.user?.following.length}
            </span> Following
          </a>
        </div>

        <div className='info__content--detail'>
          <h6>{profile.user?.fullName}</h6>
          <p>{profile.user?.bio}</p>
          <h6 >{profile.user?.email}</h6>
        </div>
      </div>

      {onEdit && <EditProfile setOnEdit={setOnEdit} user={profile.user} />}

      {onShowFollower && <Follower title="Follower" data={followers} setShow={setOnShowFollower} />}
      {onShowFollowing && <Follower title="Following" data={following} setShow={setOnShowFollowing} />}
    </div>
  )
}

export default Info;