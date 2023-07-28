import React from 'react';
import "./index.scss";


function CardBody() {
  return (
    <div className='card__body w-100'>
      <div className='card__content w-100'>
        <p>This is the content</p>
      </div>

      <img src="https://i.9mobi.vn/cf/images/2015/03/nkk/hinh-dep-1.jpg" alt="Content" className='card__image' />

    </div>
  )
}

export default CardBody;