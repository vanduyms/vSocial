import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.scss";

function UserPost({ profile, id }) {
  const navigate = useNavigate();

  const handleClick = (e, index) => {
    e.preventDefault();

    navigate(`/post/${profile.posts[index]._id}`);
  }

  return (
    <div className='userPost w-100 p-2'>
      <div className='userPost--container '>
        {profile.posts ?
          profile.posts.map((post, index) => (
            <div className='userPost--container__info' onClick={e => handleClick(e, index)} key={index}>
              <img className='userPost__img' src={post.images[0]} alt="Post img" />
              <div className='userPost__info'>
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

export default UserPost;