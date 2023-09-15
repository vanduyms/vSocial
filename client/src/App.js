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

function App() {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();

    dispatch(setSocket());

    return () => {
      socket.close();
    };
  }, [dispatch]);

  return (
    <Router>
      {/* <Notify /> */}
      <input type="checkbox" id='theme' />
      <div className="App">
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
