import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../PostCard';
import { getAllPostsAction } from '../../redux/actions/postAction';
import Loading from '../Loading';
import LoadMoreBtn from '../LoadMoreButton';
import { getDataAPI } from '../../utils/fetchData';
import { updateState } from '../../redux/reducers/postReducer';

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

  const [load, setLoad] = useState(false)

  const handleLoadMore = async () => {
    setLoad(true)
    let page = post.page;
    const res = await getDataAPI(`post?page=${page}&limit=9`, auth.userToken);
    await dispatch(updateState({
      posts: res.data.posts,
      page: page + 1
    }))
    setLoad(false)
  }


  return (
    <div className='posts d-flex flex-column align-items-center'>
      {
        post?.loading && <Loading />
      }

      {
        allPost?.map(item => (
          <PostCard key={item._id} postItem={item} />
        ))
      }

      <LoadMoreBtn result={post.result} page={post.page}
        load={load} handleLoadMore={handleLoadMore} />

    </div>
  )
}

export default Post;