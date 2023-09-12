/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/reducers/authReducer';
import Avatar from '../Avatar';
import Search from '../Search';
import "./index.scss";

function Navbar() {
  const navLinks = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'Message', icon: 'near_me', path: '/message' },
    { label: 'Discovery', icon: 'explore', path: '/discover' },
    { label: 'Notify', icon: 'favorite', path: '/notify' },
  ];

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());

    window.location.reload();
  }

  const user = useSelector(state => state.auth);
  const userInfo = JSON.parse(user.userInfo);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
      <Link className="navbar-brand" to="/">V_Social</Link>
      <Search />
      <div className="menu" >
        <ul className="navbar-nav mr-auto flex-row">
          {
            navLinks.map((link, index) => (
              <li key={index} className='nav-item active'>
                <Link className='nav-link' to={link.path}>
                  <span className='material-icons'>{link.icon}</span>
                </Link>
              </li>
            ))
          }
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <Avatar src={userInfo?.avatar} size='small' />
            </a>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to={`/profile/${userInfo?._id}`}>Trang cá nhân</Link>
              <Link className="dropdown-item" to="/">Chế độ tối</Link>
              <hr className="dropdown-divider" />
              <Link className="dropdown-item" to="/" onClick={handleLogout}>Đăng xuất</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav >
  )
}

export default Navbar;