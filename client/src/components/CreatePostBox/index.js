/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react';
import Avatar from '../Avatar';
import EmojiPicker from "emoji-picker-react";
import "./index.scss";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction, getAllPostsAction, updatePostAction } from '../../redux/actions/postAction';
import { useClickOutSide } from '../../hook/useToggle';

function CreatePostBox({ setShowCreateBox, user, data }) {
  const textAreaRef = useRef();
  const [content, setContent] = useState(data ? data.content : "");
  const [image, setImage] = useState(data ? data.images[0] : "");
  const [showBoxImage, setShowBoxImage] = useState(data?.images[0] ? true : false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [refOutSide] = useClickOutSide({ "onClickOutside": () => setShowCreateBox(false) });

  const boxImage = useRef();
  const auth = useSelector(state => state.auth);

  const changeImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    TransformFile(file);
  }

  const TransformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      }
      boxImage.current = "none";
    } else {
      setImage("");
    }
  }

  useEffect(() => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }, [content]);

  const handleEmojiClick = (emoji) => {
    setContent(content + emoji.emoji);
  }

  const dispatch = useDispatch();

  let id = data?._id;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data) {
      await dispatch(createPostAction({ auth, content, image, dispatch }));
      setShowCreateBox(false);
      await dispatch(getAllPostsAction({ auth }));
    } else {
      await dispatch(updatePostAction({ auth, content, image, id, dispatch }));
      setShowCreateBox(false);
    }
  }

  return (
    <div className='createPost-box'>
      <form className='text-center' ref={refOutSide}>
        <button
          className="btn btn_close rounded-circle d-flex align-items-center p-1"
          onClick={() => setShowCreateBox(false)}
        >
          <span
            className="material-icons">
            close
          </span>
        </button>
        <h3 className='title mb-3'>
          {
            data ? 'Chỉnh sửa bài viết' : 'Tạo bài viết'
          }
        </h3>

        <div className='line mb-3'>

        </div>
        <div className='form-group'>
          <div className='user-info mb-3 d-flex align-items-center'>
            <Link to={`/profile/${user._id}`}>
              <Avatar src={user.avatar} size="small-40" />
            </Link>
            <div className='user d-flex flex-column align-items-start' >
              <Link to={`/profile/${user._id}`}>
                <p className='username py-0 my-0'>{user.fullName}</p>
              </Link>
              <button className='btn py-0 btn-setting'>Bạn bè</button>
            </div>
          </div>

          <textarea
            type="text"
            className="w-100 mb-3"
            id="content-create_post"
            placeholder='Bạn đang nghĩ gì ?'
            ref={textAreaRef}
            value={content}
            onChange={e => setContent(e.target.value)}
          />

          <div className='form-group w-100 d-flex align-items-center justify-content-end mb-3 btn-emoji'>
            <a onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <span className="material-icons text-secondary" >
                mood
              </span>
            </a>
          </div>

          {
            showBoxImage &&
            <div className='form-group add-image_container py-2 d-flex flex-column align-items-center mb-3 rounded-3'>
              <div
                className='title'
                hidden={image}
              >
                <span className="material-icons text-secondary fs-1" >
                  image
                </span>
                <span className='fs-5 fw-medium text-secondary'>Thêm ảnh vào bài viết</span>
              </div>
              <input
                type="file"
                accept='image/*'
                onChange={changeImage}
              />
              <img className="selected-image rounded-3" src={image} />

              <button
                className='btn btn-outline-secondary btn-close_image rounded-circle d-flex align-items-center p-1 position-absolute'
                onClick={() => {
                  setShowBoxImage(false);
                  setImage("");
                }}>
                <span className="material-icons" >
                  close
                </span>
              </button>
            </div>
          }

        </div>

        <div className='form-group w-100 mb-3 d-flex justify-content-between align-items-center add-container py-2 px-2 rounded-2'>
          <a className='text text-decoration-none'>Thêm vào bài viết </a>
          <ul className='btn-add_menu list-unstyled d-flex align-items-center justify-content-between'>
            <li className='btn-add_item dropdown' onClick={() => setShowBoxImage(!showBoxImage)}>
              <span className="material-icons text-success " >
                image
              </span>
            </li>
            <li className='btn-add_item dropdown'>
              <span className="material-icons text-primary " >
                new_label
              </span>
            </li>
            <li className='btn-add_item dropdown'>
              <span className="material-icons text-warning " >
                mood
              </span>
            </li>
            <li className='btn-add_item dropdown'>
              <span className="material-icons text-danger " >
                location_on
              </span>
            </li>
            <li className='btn-add_item dropdown'>
              <span className="material-icons text-info " >
                gif_box
              </span>
            </li>
            <li className='btn-add_item dropdown'>
              <span className="material-icons  " >
                more_horiz
              </span>
            </li>
          </ul>
        </div>
        {/* <input onChange={handleSubmit} /> */}
        <button
          onClick={handleSubmit}
          className="btn btn-info w-100"
        >
          {!data ? "Đăng" : "Cập nhật"}
        </button>
        {
          showEmojiPicker && (
            <div className='emoji-container'>
              <EmojiPicker
                onEmojiClick={(emoji) => handleEmojiClick(emoji)}
              />
            </div>
          )}
      </form>


    </div>
  )
}

export default CreatePostBox;