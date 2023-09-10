import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../PostCard';
import { getPostsAction } from '../../redux/actions/postAction';

function Post() {
  const [allPost, setAllPost] = useState([]);
  const dispatch = useDispatch();

  const { auth, post } = useSelector(state => state);

  useEffect(() => {
    setAllPost(post.posts);
  }, [post]);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getPostsAction({ auth }));
    }

    loadData();
  }, [dispatch, auth]);


  return (
    <div className='posts'>
      {
        post.loading &&
        <div className="spinner-border text-primary d-flex m-auto" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      }

      {
        allPost?.map(item => (
          <PostCard key={item._id} post={item} />
        ))
      }
    </div>
  )
}

export default Post;