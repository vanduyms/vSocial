import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import Loading from "../../components/Loading";
import Info from '../../components/Info';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfileUser } from '../../redux/actions/profileAction';
import Saved from '../../components/Saved';
import UserPost from '../../components/UserPost';
import "./index.scss";
import { getId } from '../../redux/reducers/profileReducer';

function Profile() {
  const { auth, profile } = useSelector(state => state);
  const [saveTab, setSaveTab] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getId(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (profile.ids.every(item => item !== id)) {
      dispatch(getProfileUser({ id, auth }))
    }
  }, [id, auth, dispatch, profile.ids])


  return (
    <div className='profile'>
      <Navbar />
      <div className='main profile--container'>
        <Info auth={auth} profile={profile} id={id} dispatch={dispatch} />

        {
          auth.userInfo._id === id &&
          <div className="profile--tab m-auto d-flex align-items-center justify-content-center w-100 p-2">
            <button className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}>Posts</button>
            <button className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}>Saved</button>
          </div>
        }

        {
          profile.loading
            ? <Loading />
            : <>
              {
                saveTab
                  ? <Saved auth={auth} profile={profile} dispatch={dispatch} />
                  : <UserPost auth={auth} profile={profile} dispatch={dispatch} id={id} />
              }
            </>
        }
      </div>
    </div>
  )
}

export default Profile;