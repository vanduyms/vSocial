import React from 'react'
import { useSelector } from 'react-redux';
import CardBody from '../CardBody';
import CardFooter from '../CardFooter';
import CardHeader from '../CardHeader';
import "./index.scss";

function PostCard() {
  const { auth } = useSelector(state => state);
  return (
    <div className='postcards d-flex flex-column align-items-center m-auto px-3 py-1 rounded-3'>
      <CardHeader user={JSON.parse(auth.userInfo)} />

      <CardBody />

      <CardFooter />
    </div>
  )
}

export default PostCard;