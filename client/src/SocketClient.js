import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SocketClient = () => {
  const { auth, socket } = useSelector(state => state);
  const dispatch = useDispatch();

  const userInfo = typeof auth.userInfo === "string" ? JSON.parse(auth.userInfo) : auth.userInfo;

  useEffect(() => {
    socket.emit('joinUser', userInfo);
  }, [auth, socket]);

  useEffect(() => {
    socket.emit('likeToClient', newPost => {

    });

    return () => socket.off("likeToClient");
  }, [auth, socket]);

  useEffect(() => {
    socket.emit('unLikeToClient', newPost => {
      console.log(newPost);
    });

    return () => socket.off("unLikeToClient");
  }, [auth, socket]);
}

export default SocketClient;