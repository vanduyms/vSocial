import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import PostCard from "../../components/PostCard";
import { getPostAction } from '../../redux/actions/postAction';
import "./index.scss";

function Post() {
  const { id } = useParams()

  const { auth, post } = useSelector(state => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPostAction({ auth, id }));
  }, [dispatch, id, auth]);

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <div className="posts">
      <Navbar />

      <div className='posts--container'>
        <div className='posts--header w-100 d-flex align-items-center justify-content-center p-2'>
          <div className='back--btn align-items-center' onClick={handleBack}>
            <span className='material-icons'>arrow_left</span>
          </div>
          <h5 className='fw-bold'>Bài viết</h5>
        </div>
        {
          post.posts[0] !== null ? post.loading ? <Loading />
            : post.posts.map(item => (
              <PostCard key={item._id} postItem={item} />
            )) : (
            <div className='alert w-100 m-6 d-flex flex-column align-items-center justify-content-center'>
              <h3>Không tìm thấy bài viết</h3>
              <p className='fw-medium fs-5 text-primary' onClick={handleBack}>Quay trở lại</p>
            </div>
          )
        }

      </div>
    </div>
  )
}

export default Post;