import React from 'react';
import "./index.scss";

function Loading() {
  return (
    <div className='loading'>
      <div className="spinner-border text-primary d-flex m-auto" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Loading;