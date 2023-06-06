import React from 'react'
import { useSelector } from 'react-redux';
import "./index.scss";

function Avatar({ src, size }) {
  const { theme } = useSelector(state => state.auth);

  return (
    <img
      src={src} alt="avatar" className={`avatar ${size}`} style={{ filter: `${theme ? 'invert(1)' : 'invert(0)'}` }}
    />
  )
}

export default Avatar;