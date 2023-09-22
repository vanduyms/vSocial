import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./redux/reducers/authReducer";
import { updatePost } from "./redux/reducers/postReducer";
import { setUser } from "./redux/reducers/profileReducer";

const SocketClient = () => {
  const { auth, socket } = useSelector(state => state);
  const dispatch = useDispatch();
  const audioRef = useRef()
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

  return (
    <>
      <audio controls ref={audioRef} style={{ display: 'none' }} >

      </audio>
    </>
  )
}

export default SocketClient;