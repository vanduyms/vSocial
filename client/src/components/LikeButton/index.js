import React from 'react';
import { useSelector } from 'react-redux';

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  return (
    <>
      {
        isLike
          ? <span className="material-icons text-danger d-flex align-items-center" onClick={handleUnLike} >favorite</span>
          : <span className="material-icons  d-flex align-items-center" onClick={handleLike}>favorite_border</span>
      }
    </>
  )
}

export default LikeButton