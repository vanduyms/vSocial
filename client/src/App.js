/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import io from "socket.io-client";
import { publicRoutes } from './routes';
import { useEffect } from 'react'
import { refreshToken } from './redux/actions/authAction';
import { setSocket } from './redux/reducers/socketReducer';
import { updateUserInfo } from './redux/reducers/authReducer';
import SocketClient from './SocketClient';

function App() {
  const { auth, socket } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof auth.userInfo === "string") {
      const userInfo = JSON.parse(auth.userInfo);
      dispatch(updateUserInfo(userInfo));
    }

    dispatch(refreshToken());
    const socketIO = io("http://localhost:3001");

    dispatch(setSocket(socketIO));

    return () => socketIO.close();

  }, [dispatch]);

  return (
    <Router>
      {/* <Notify /> */}
      <input type="checkbox" id='theme' />
      <div className="App">
        {socket.socket && <SocketClient />}
        <Routes>
          <Route path='/' element={auth.userToken ? <Home /> : <Login />} />
          {
            publicRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Page />}
                />
              )
            })
          }
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
