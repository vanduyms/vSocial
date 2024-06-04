import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import Loading from "../../components/Loading";
import Info from '../../components/Info';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfileUser } from '../../redux/actions/profileAction';
import Saved from '../../components/Saved';
import UserPost from '../../components/UserPost';
import LoadMoreButton from "../../components/LoadMoreButton";
import "./index.scss";
import { getId, updateState } from '../../redux/reducers/profileReducer';
import { getDataAPI } from '../../utils/fetchData';

function Profile() {
  const { auth, profile } = useSelector(state => state);
  const [saveTab, setSaveTab] = useState(false);
  const [load, setLoad] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getId(id));
    await dispatch(getProfileUser({ id, auth }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  const handleLoadMore = async () => {
    setLoad(true)
    const page = profile.page;
    const res = await getDataAPI(`user_posts/${id}?page=${page}&limit=9`, auth.userToken);
    await dispatch(updateState({
      page: page + 1,
      posts: res.data.posts,
      result: profile.posts.length
    }))
    setLoad(false)
  }


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

        <LoadMoreButton result={profile.result} page={profile.page}
          load={load} handleLoadMore={handleLoadMore} />
      </div>
    </div>
  )
}

export default Profile;