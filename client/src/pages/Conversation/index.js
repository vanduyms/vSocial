import React, { useEffect } from 'react'
import LeftMessageSide from '../../components/LeftMessageSide';
import RightMessageSide from '../../components/RightMessageSide';
import Navbar from '../../components/Navbar';
import "./index.scss";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from '../../redux/actions/profileAction';
import { addUser } from '../../redux/reducers/messageReducer';

function Conversation() {
  const { auth } = useSelector(state => state);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      const res = await dispatch(getProfileUser({ id, auth }));

      await dispatch(addUser({ ...res.payload.user, text: '', media: [] }));
    }


    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="conversation w-100">
      <Navbar />
      <div className='conversation--container w-100 h-100 d-flex'>
        <LeftMessageSide />
        <div className="col-md-8 px-0 right__mess">
          <RightMessageSide />
        </div>
      </div>
    </div>


  )
}

export default Conversation;

