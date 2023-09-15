import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../PostCard';
import { getPostsAction } from '../../redux/actions/postAction';
import Loading from '../Loading';

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