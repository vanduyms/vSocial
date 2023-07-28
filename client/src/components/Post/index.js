import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadIcon from "../../images/loading.png";
import PostCard from '../PostCard';

function Post() {
  const { id } = useParams();
  const { auth } = useSelector(state => state);
  const [post, setPost] = useState([]);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch();
  // }, [])
  return (
    <div className='posts'>
      {/* {
        post.length === 0 &&
        <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
      } */}

      {/* {
        post.map(item => (
          <PostCard key={item._id} post={item} />
        ))
      } */}
      <PostCard />
    </div>
  )
}

export default Post;