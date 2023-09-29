import React from 'react';
import LeftMessageSide from '../../components/LeftMessageSide';
import Navbar from '../../components/Navbar';
import "./index.scss";

function Message() {
  return (
    <>
      <div className='message'>
        <Navbar />
        <div className='message--container w-100 h-100'>
          <LeftMessageSide />
          <div className="col-md-8 px-0 right__mess">
            <div className="d-flex justify-content-center  align-items-center flex-column h-100">

              <span className="material-icons"
                style={{ fontSize: '5rem' }} >
                message
              </span >
              <h4>Message</h4>
            </div>
          </div>

        </div>
      </div>
    </>

  )
}

export default Message;