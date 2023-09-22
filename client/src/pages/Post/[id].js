import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import PostCard from "../../components/PostCard";
import { getPostAction } from '../../redux/actions/postAction';
import "./index.scss";

function Post() {
  const { id } = useParams()

  const { auth, post } = useSelector(state => state);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getPostAction({ auth, id }));
  }, [dispatch, id, auth])

  return (
    <div className="posts">
      <Navbar />

      <div className='posts--container'>
        {post.loading ? <Loading />
          : post.posts.map(item => (
            <PostCard key={item._id} postItem={item} />
          ))
        }
      </div>
    </div>
  )
}

export default Post;