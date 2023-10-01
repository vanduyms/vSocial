import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { getDiscoverPosts } from '../../redux/actions/discoverAction';
import "./index.scss";

function Discover() {
  const { auth, discover } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiscoverPosts({ auth }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='discover'>
      <Navbar />
      <div className='main discover--container d-flex justify-content-start align-items-center flex-wrap'>
        {
          discover.posts.map(post => (
            <div className='discover--item'>
              <Link to={`/post/${post._id}`}>
                <img className='item__img' src={post.images[0]} alt="img" />

                <div className='item__info'>
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
                    <p>{post.comments.length}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Discover;