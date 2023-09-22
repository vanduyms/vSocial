import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../PostCard';
import { getAllPostsAction } from '../../redux/actions/postAction';
import Loading from '../Loading';

function Post() {
  const [allPost, setAllPost] = useState([]);
  const dispatch = useDispatch();

  const { auth, post } = useSelector(state => state);

  useEffect(() => {
    setAllPost(post.posts);
  }, [post]);

  useEffect(() => {
    dispatch(getAllPostsAction({ auth }));
  }, [dispatch, auth]);

  return (
    <div className='posts d-flex flex-column'>
      {
        post?.loading && <Loading />
      }

      {
        allPost?.map(item => (
          <PostCard key={item._id} postItem={item} />
        ))
      }

    </div>
  )
}

export default Post;