import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useClickOutSide } from '../../hook/useToggle';
import { getDataAPI } from '../../utils/fetchData';
import UserCard from '../UserCard';
import "./index.scss";

function Search() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [showClearBtn, setShowClearBtn] = useState(false);

  const { userToken } = useSelector(state => state.auth);

  const [refOutside] = useClickOutSide({ "onClickOutside": () => setShowClearBtn(false) });

  useEffect(() => {
    if (search && userToken) {
      getDataAPI(`search?username=${search}`, userToken).then(res => { setUsers(res.data.users) });
    }
  }, [search, userToken]);

  function handleInputChange() {
    setShowClearBtn(true);
  }

  const handleClose = () => {
    setSearch('')
    setUsers([])
  }

  return (
    <form className='search_form'>
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        placeholder="Tìm kiếm"
        onClick={handleInputChange}
        onChange={e => {
          setSearch(e.target.value.toLowerCase().replace(/ /g, ''));
        }}
      />

      <div className='icon' style={{ display: showClearBtn ? 'none' : 'flex' }} >
        <span className='material-icons'>search</span>
      </div>
      <div
        className='icon'
        ref={refOutside}
        onClick={() => {
          setSearch('');
          setShowClearBtn(false);
        }}
        style={{ display: showClearBtn ? 'flex' : 'none' }}
      >
        <span className='material-icons'>close</span>
      </div>

      <div className="users">
        {
          search && showClearBtn && users.map(user => (
            <UserCard
              key={user._id}
              user={user}
              border="border"
              handleClose={handleClose}
            />
          ))
        }
      </div>
    </form>
  )
}

export default Search;