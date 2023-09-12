import React from 'react'
import CardBody from '../CardBody';
import CardFooter from '../CardFooter';
import CardHeader from '../CardHeader';
import "./index.scss";

function PostCard({ postItem }) {
  return (
    <div className='postcards d-flex flex-column align-items-center m-auto px-3 py-1 rounded-3 my-4'>
      <CardHeader postItem={postItem} />

      <CardBody post={postItem} />

      <CardFooter post={postItem} />
    </div>
  )
}

export default PostCard;