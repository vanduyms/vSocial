import React from 'react';
import "./index.scss";


function CardBody({ post }) {
  return (
    <div className='card__body w-100'>
      <div className='card__content w-100'>
        <p>{post.content}</p>
      </div>

      {
        post.images[0] ?
          <img src={post.images[0]} alt="Content" className='card__image' />
          :
          <div></div>
      }

    </div>
  )
}

export default CardBody;