import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./redux/reducers/authReducer";
import { setOnline, setOffline } from "./redux/reducers/onlineReducer";
import { addMessage, addUser } from "./redux/reducers/messageReducer";
import { updatePost } from "./redux/reducers/postReducer";
import { setUser } from "./redux/reducers/profileReducer";

const SocketClient = () => {
  const { auth, socket, online } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.socket.emit('joinUser', auth.userInfo);
  }, [socket, auth.userInfo]);

  useEffect(() => {
    socket.socket.on('likeToClient', newPost => {
      dispatch(updatePost(newPost));
    });

    return () => socket.socket.off("likeToClient");
  }, [auth, socket, dispatch]);

  useEffect(() => {
    socket.socket.on('unLikeToClient', newPost => {
      dispatch(updatePost(newPost));
    });

    return () => socket.socket.off("unLikeToClient");
  }, [auth, socket, dispatch]);

  useEffect(() => {
    socket.socket.on('followToClient', info => {
      dispatch(setUser(info.newUser));
      dispatch(setCredentials(info.newAuthInfo));
    })

    return () => socket.socket.off('followToClient')
  }, [socket, dispatch, auth])

  useEffect(() => {
    socket.socket.on('unFollowToClient', info => {
      dispatch(setUser(info.newUser));
      dispatch(setCredentials(info.newAuthInfo));
    })

    return () => socket.socket.off('unFollowToClient')
  }, [socket, dispatch, auth])

  useEffect(() => {
    socket.socket.on('createCommentToClient', newPost => {
      dispatch(updatePost(newPost));
    })

    return () => socket.socket.off('createCommentToClient')
  }, [socket, dispatch, auth]);

  useEffect(() => {
    socket.socket.on('deleteCommentToClient', newPost => {
      dispatch(updatePost(newPost));
    })

    return () => socket.socket.off('deleteCommentToClient')
  }, [socket, dispatch, auth]);

  useEffect(() => {
    socket.socket.on('addMessageToClient', msg => {
      dispatch(addMessage(msg))

      dispatch(addUser({
        ...msg.user,
        text: msg.text,
        media: msg.media
      })
      )
    })

    return () => socket.socket.off('addMessageToClient')
  }, [socket, dispatch])

  // Check User Online / Offline
  useEffect(() => {
    socket.socket.emit('checkUserOnline', auth.userInfo)
  }, [socket, auth.userInfo])

  useEffect(() => {
    socket.socket.on('checkUserOnlineToMe', data => {
      data.forEach(item => {
        if (!online.user.includes(item.id)) {
          dispatch(setOnline(item.id))
        }
      })
    })

    return () => socket.socket.off('checkUserOnlineToMe')
  }, [socket, dispatch, online])

  useEffect(() => {
    socket.socket.on('checkUserOnlineToClient', id => {
      if (!online.user.includes(id)) {
        dispatch(setOffline(id))
      }
    })

    return () => socket.socket.off('checkUserOnlineToClient')
  }, [socket, dispatch, online])

  return (
    <>
    </>
  )
}

export default SocketClient;