import React from 'react';
import "./index.scss";

function Saved({ auth, profile, dispatch, id }) {
  return (
    <div className='savedPost userPost w-100 p-2'>
      <div className='savedPost--container userPost--container '>
        {profile.posts ?
          profile.posts.map(post => (
            <div className='savedPost--container__info userPost--container__info'>
              <img className='userPost__img userPost__img' src={post.images[0]} alt="Post img" />
              <div className='userPost__info userPost__info'>
                <div>
                  <span className="material-icons">
                    favorite
                  </span>
                  <p>{post.likes.length} </p>
                </div>
                <div>
                  <span className="material-icons">
                    chat_bubble_outline
                  </span>
                  <p>{1}</p>
                </div>
              </div>
            </div>
          )) : (
            <p>Không có bài viết nào</p>
          )
        }
      </div>
    </div>
  )
}

export default Saved;