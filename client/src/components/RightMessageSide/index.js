/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addMessageAction, deleteConversation, getMessages, loadMoreMessages } from '../../redux/actions/messageAction';
import { imageUpload } from '../../utils/imageUpload';
import { videoShow, imageShow } from "../../utils/mediaShow";
import MessageDisplay from '../MessageDisplay';
import UserCard from '../UserCard';
import "./index.scss";

function RightMessageSide() {
  const { auth, message, theme, socket } = useSelector(state => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [text, setText] = useState('');
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);

  const refDisplay = useRef();
  const pageEnd = useRef();

  const [data, setData] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const newData = message.data.find(item => item._id === id)
    if (newData) {
      setData(newData.messages)
      setResult(newData.result)
      setPage(newData.page)
    }
  }, [message.data, id]);

  useEffect(() => {
    if (id && message.users.length > 0) {
      setTimeout(() => {
        refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }, 50)

      const newUser = message.users.find(user => user._id === id)
      if (newUser) setUser(newUser)
    }
  }, [message.users, id]);

  const caller = ({ video }) => {
    const { _id, avatar, username, fullName } = user

    const msg = {
      sender: auth.user._id,
      recipient: _id,
      avatar, username, fullName, video
    }
  }

  const callUser = ({ video }) => {
    const { _id, avatar, username, fullName } = auth.user

    const msg = {
      sender: _id,
      recipient: user._id,
      avatar, username, fullName, video
    }

    // if(peer.open) msg.peerId = peer._id

    // socket.emit('callUser', msg)
  }

  const handleBack = () => {
    navigate("/message");
  }



  const handleAudioCall = () => {
    caller({ video: false })
    callUser({ video: false })
  }

  const handleVideoCall = () => {
    caller({ video: false })
    callUser({ video: false })
  }

  const handleDeleteConversation = async () => {
    if (window.confirm('Do you want to delete?')) {
      await dispatch(deleteConversation({ auth, id }))
      return navigate('/message')
    }
  }

  const handleChangeMedia = (e) => {
    const files = [...e.target.files]
    let newMedia = []

    files.forEach(file => {
      if (!file) window.alert("File don't exist");
      ;

      if (file.size > 1024 * 1024 * 5) {
        window.alert("File is too big");
        ;
      }

      return newMedia.push(file)
    })
    setMedia([...media, ...newMedia]);
  }

  const handleDeleteMedia = (index) => {
    const newArr = [...media]
    newArr.splice(index, 1)
    setMedia(newArr)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim() && media.length === 0) return;
    setText('')
    setMedia([])
    setLoadMedia(true)

    let newArr = [];
    if (media.length > 0) newArr = await imageUpload(media)

    const msg = {
      sender: auth.userInfo._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString()
    }

    await dispatch(addMessageAction({ msg, auth, socket }))

    setLoadMedia(false);
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }

  useEffect(() => {
    const getMessagesData = async () => {
      await dispatch(getMessages({ auth, id }));
      if (refDisplay.current) {
        setTimeout(() => {
          refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }, 50)
      }
    }
    getMessagesData()
  }, [id, dispatch, auth]);


  // Load More
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsLoadMore(p => p + 1)
        }
      })
    }, {
      threshold: 0.7
    })

    observer.observe(pageEnd.current)
  }, [setIsLoadMore])

  useEffect(() => {
    if (isLoadMore > 1) {
      if (result >= page * 9) {
        dispatch(loadMoreMessages({ auth, id, page: page + 1 }))
        setIsLoadMore(1)
      }
    }
    // eslint-disable-next-line
  }, [isLoadMore])

  return (
    <>
      <div className='d-flex flex-column h-100 w-100'>
        <div className="message__header" style={{ cursor: 'pointer' }} >
          {
            <div className='w-100 d-flex align-items-center justify-content-between'>
              <div className='user--info d-flex align-items-center'>
                <div className='btn--back d-flex align-items-center' onClick={handleBack}>
                  <span className='material-icons'>
                    arrow_back
                  </span>
                </div>
                <UserCard user={user} />
              </div>
              <div className='action--menu'>
                <span
                  className="material-icons action--item"
                  onClick={handleAudioCall}
                >
                  phone
                </span>

                <span
                  className="material-icons action--item"
                  onClick={handleVideoCall}
                >
                  videocam
                </span>

                <span
                  className="material-icons action--item text-danger"
                  onClick={handleDeleteConversation}
                >
                  delete
                </span>
              </div>
            </div>
          }
        </div>

        <div className="chat__container"
          style={{ height: media.length > 0 ? 'calc(100% - 180px)' : '' }} >
          <div className="chat__display" ref={refDisplay}>
            <button style={{ marginTop: '25px', opacity: 0 }} ref={pageEnd}>
              Load more
            </button>

            {
              data.map((msg, index) => (
                <div key={index}>
                  {
                    msg.sender !== auth.userInfo._id &&
                    <div className="chat__row other__message">
                      <MessageDisplay user={user} msg={msg} theme={theme} />
                    </div>
                  }

                  {
                    msg.sender === auth.userInfo._id &&
                    <div className="chat__row you__message">
                      <MessageDisplay user={auth.userInfo} msg={msg} theme={theme} data={data} />
                    </div>
                  }
                </div>
              ))
            }


            {
              loadMedia &&
              <div className="chat__row you__message">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            }

          </div>
        </div>

        <div className="show__media" style={{ display: media.length > 0 ? 'grid' : 'none' }} >
          {
            media.map((item, index) => (
              <div key={index} id="file__media">
                {
                  item.type.match(/video/i)
                    ? videoShow(URL.createObjectURL(item), theme)
                    : imageShow(URL.createObjectURL(item), theme)
                }
                <span onClick={() => handleDeleteMedia(index)} >&times;</span>
              </div>
            ))
          }
        </div>

        <form className="chat__input w-100" onSubmit={handleSubmit} >
          <div className='input__container w-100 d-flex'>
            <input type="text" placeholder="Nhập tin nhắn ..."
              value={text} onChange={e => setText(e.target.value)}
            />

            <div className="file__upload d-flex align-items-center">
              <span className='material-icons text-success' >image</span>
              <input type="file" name="file" id="file"
                multiple accept="image/*,video/*" onChange={handleChangeMedia} />
            </div>

            <button type="submit" className="material-icons item"
              disabled={(text || media.length > 0) ? false : true}>
              near_me
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
export default RightMessageSide;