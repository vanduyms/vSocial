import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getConversations } from '../../redux/actions/messageAction';
import { addUser } from '../../redux/reducers/messageReducer';
import { getDataAPI } from '../../utils/fetchData';
import UserCard from '../UserCard';
import "./index.scss";

function LeftMessageSide() {
  const { auth, message } = useSelector(state => state);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [searchUsers, setSearchUsers] = useState([]);
  const pageEnd = useRef();
  const [page, setPage] = useState(0)

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!setSearchText) return setSearchUsers([]);
    try {
      const res = await getDataAPI(`search?username=${searchText}`, auth.userToken);
      setSearchUsers(res.data.users);
    } catch (err) {
    }
  }

  const handleAddUser = async (user) => {
    setSearchText('');
    setSearchUsers([]);
    dispatch(addUser({ ...user, text: '', media: [] }))

    navigate(`/message/${user._id}`);
  }

  const isActive = (user) => {
    if (id === user._id) return 'active';
    return '';
  }
  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }))
  }, [dispatch, auth, message.firstLoad]);

  // Load More
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setPage(p => p + 1)
        }
      })
    }, {
      threshold: 0.1
    })

    observer.observe(pageEnd.current)
  }, [setPage]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }))
    }
  }, [message.resultUsers, page, auth, dispatch])

  return (
    <div className='message--container__left p-2 d-flex flex-column'>
      <div className='listChat--head'>
        <h3>Tin nhắn</h3>
      </div>

      <div className='search--container w-100 p-2 rounded-5 d-flex align-items-center'>
        <input
          className='input w-100 bg-transparent ml-2'
          value={searchText}
          onChange={e => {
            setSearchText(e.target.value.toLowerCase().replace(/ /g, ''));
          }}
        />
        <div
          className='search--btn d-flex align-items-center'
          onClick={handleSearch}>
          <span className='material-icons'>search</span>
        </div>
      </div>

      <div className='listChat--content'>
        {
          searchUsers.length !== 0
            ? <>
              {
                searchUsers.map(user => (
                  <div key={user._id} className={`message__user ${isActive(user)}`}
                    onClick={() => handleAddUser(user)}
                  >
                    <UserCard user={user} />
                  </div>
                ))
              }

            </>
            : <>
              {
                message.users.map(user => (
                  <div key={user._id} className={`message__user ${isActive(user)}`}
                    onClick={() => handleAddUser(user)}>
                    <UserCard user={user} msg={true}>
                      {
                        // user.online
                        //   ? <span className="material-icons text-success userActive" >circle</span>
                        //   : auth.userInfo.following.find(item =>
                        //     item._id === user._id
                        //   ) && <span className="material-icons userActive">circle</span>

                      }
                    </UserCard>
                  </div>
                ))
              }
            </>
        }
      </div>
      <button ref={pageEnd} style={{ opacity: 0 }} >Load More</button>
    </div>
  )
}

export default LeftMessageSide