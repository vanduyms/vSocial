import React from 'react';
import { useClickOutSide } from '../../hook/useToggle';
import UserComponent from '../UserComponent';
import "./index.scss";

function Follower({ data, title, setShow }) {
  const [refOutside] = useClickOutSide({ "onClickOutside": () => setShow(false) });

  return (
    <div className='follows'>
      <form ref={refOutside}>
        <button
          className="btn btn_close rounded-circle d-flex align-items-center p-1"
          onClick={() => setShow(false)}
        >
          <span className="material-icons">
            close
          </span>
        </button>

        <div className='follows_content'>
          <h3>{title}</h3>
          {
            data.map((user, index) => (
              <UserComponent key={index} user={user} isFollow={true} />
            ))
          }
        </div>
      </form>

    </div>
  )
}

export default Follower;