import React from 'react';
import UserComponent from '../UserComponent';
import "./index.scss";

function Follower({ data, title, setShow }) {
  return (
    <div className='follows'>
      <button
        className="btn btn-danger btn_close"
        onClick={() => setShow(false)}
      >
        Close
      </button>

      <div className='follows_content'>
        <h3>{title}</h3>
        {
          data.map((user, index) => (
            <UserComponent key={index} user={user} isFollow={true} />
          ))
        }
      </div>

    </div>
  )
}

export default Follower;