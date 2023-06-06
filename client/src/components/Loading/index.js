import React from 'react';
import "./index.scss";

function Loading() {
  return (
    <div className="loading position-fixed w-100 h-100 ">
      <div className="loading-spinner">
      </div>
      <p>Loading</p>
    </div>
  )
}

export default Loading;