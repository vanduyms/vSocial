import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function NotFound() {
  return (
    <div>
      <Navbar />
      <div className='main w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center'>
        <h1 className='fw-bold'>Not Found</h1>
        <p className='text-dark fw-medium fs-5'>Go to <Link to="/">Home</Link></p>
      </div>
    </div>
  )
}

export default NotFound;