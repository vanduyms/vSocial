import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSuggestionUser } from '../../redux/actions/suggestionAction';
import FollowBtn from '../FollowBtn';
import UserCard from "../UserCard";
import "./index.scss";

function SuggestionUser() {
  const { auth, suggestion } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSuggestionUser({ auth }))
  }, [dispatch])
  return (
    <div className='suggestionUser'>
      <div className='suggestionUser--container w-100'>
        <div className='suggestionUser--container__head px-3 py-2 w-100'>
          <h6>Gợi ý cho bạn</h6>
        </div>
        <div className='suggestionUser--container__content w-100'>
          {
            suggestion.users.map((user, index) => (
              <div key={index} className='user--item d-flex align-items-center w-100 justify-content-between p-2'>
                <UserCard user={user} key={user._id} />

                <FollowBtn user={user} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SuggestionUser