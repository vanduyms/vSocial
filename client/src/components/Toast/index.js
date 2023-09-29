import React from 'react'

const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: '5px', right: '5px', minWidth: '200px', zIndex: 50 }}>
      <div className={`toast-header text-light ${bgColor} d-flex justify-content-between`}>
        <strong className="mr-auto text-light">{msg.title}</strong>
        <button
          type="button"
          className="text-white close btn-close"
          data-dismiss="toast"
          style={{ outline: 'none' }}
          onClick={handleShow}
        >
        </button>
      </div>
    </div>
  )
}

export default Toast