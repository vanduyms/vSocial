/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./index.scss";

function CardFooter() {
  return (
    <div className='card__footer w-100 py-2'>
      <div className='card__footer--action d-flex justify-content-between align-items-center'>
        <ul className='action--left d-flex list-unstyled align-items-center'>
          <li className='action--item d-flex'>
            <span className="material-icons" id="moreLink" data-toggle="dropdown">
              favorite_border
            </span>
          </li>
          <li className='action--item d-flex'>
            <span className="material-icons" id="moreLink" data-toggle="dropdown">
              chat_bubble_outline
            </span>
          </li>
          <li className='action--item d-flex'>
            <span className="material-icons" id="moreLink" data-toggle="dropdown">
              share
            </span>
          </li>
        </ul>

        <a className='action--right action--item d-flex align-items-center text-decoration-none'>
          <span className="material-icons" id="moreLink" data-toggle="dropdown">
            bookmark_border
          </span>
        </a>
      </div>

      <div className='card__footer--info d-flex justify-content-between align-items-center'>
        <div className='card__likes'>
          <strong>2045 lượt thích</strong>
        </div>

        <div className='card__comments'>
          <strong>2045 bình luận</strong>
        </div>
      </div>
    </div>
  )
}

export default CardFooter;