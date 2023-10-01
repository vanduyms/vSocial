import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import Navbar from '../../components/Navbar';
import "./index.scss";

function Notify() {
  const { notify } = useSelector(state => state);

  return (
    <div className='notify'>
      <Navbar />
      <div className='main notify--container d-flex align-items-center p-2'>
        {
          notify.data.map(noti => (
            <Link to={noti.url} className='notify--item d-flex align-items-center text-black p-2' key={noti._id}>
              <Avatar src={noti.user.avatar} size="small-56" />
              <div className='notify--item__content d-flex align-items-center'>
                <h6 className='text-primary'>{noti.user.username}</h6>
                <span className='f text-lowercase'>{noti.text}</span>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Notify;