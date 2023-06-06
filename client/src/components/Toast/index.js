import React from 'react';

function Toast({ msg, handleShow, bgColor }) {
  return (
    <div className={`toast show position-fixed ${bgColor}`} style={{ top: '5px', right: '5px', minWidth: '200px', zIndex: 50 }}>
      <div className={`toast-header text-light ${bgColor}`}>
        <strong className="me-auto">{msg.title}</strong>
        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div className="toast-body text-light">
        {msg.body}
      </div>
    </div>
  )
}

export default Toast;