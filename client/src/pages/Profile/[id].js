import React from 'react'
import Navbar from '../../components/Navbar';
import Info from '../../components/Info';

function Profile() {
  return (
    <div>
      <Navbar />
      <div className='main'>
        <Info />
      </div>
    </div>
  )
}

export default Profile;