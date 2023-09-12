import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserPostsAction } from '../../redux/actions/postAction';
import CreatePost from '../CreatePost';
import Loading from '../Loading';
import PostCard from '../PostCard';
import "./index.scss";

function UserPost() {
  const { auth, post } = useSelector(state => state);
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPostsAction({ auth, id }));
  }, [auth, id, dispatch]);


  return (
    <div className='userPost'>
      <div className='userPost--container d-flex flex-row justify-content-between'>
        <div className='userPost--container__images py-2 px-3 bg-white my-4 rounded-3'>
          <div className='images--top d-flex flex-row justify-content-between align-items-center'>
            <p className='fw-bold'>Ảnh</p>
            <button className='btn fw-bold'>Xem tất cả</button>
          </div>
          <div className='images d-flex flex-row flex-wrap justify-content-between py-2'>
            {post.loading && <Loading />}
            {
              post.posts?.map((item, index) => {
                if (item.images[0])
                  return <img key={index} src={item.images[0]} alt="" />
              })
            }
          </div>
        </div>
        <div className='userPost--container__posts'>
          <CreatePost />
          <div className='posts__title py-2 px-3 bg-white my-4 rounded-3'>
            <p className='fw-bold'>Bài viết</p>
          </div>
          {post.loading && <Loading />}
          {
            post.posts ?
              post.posts?.map((item) =>
                <PostCard key={item._id} postItem={item} />
              ) : <p className='fw-bold'>Không có bài viết</p>
          }
        </div>
      </div>
    </div>
  )
}

export default UserPost;