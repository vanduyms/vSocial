/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import { publicRoutes } from './routes';
import { useEffect, useState } from 'react'

function App() {
  const { userToken } = useSelector(state => state.auth);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(!isLogin);
    const isUserToken = localStorage.getItem("userToken");
    { if (!isUserToken) setIsLogin(false) };
  }, [userToken])

  return (
    <Router>
      {/* <Notify /> */}
      <input type="checkbox" id='theme' />
      <div className="App">
        <Routes>
          <Route path='/' element={isLogin ? <Home /> : <Login />} />
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
