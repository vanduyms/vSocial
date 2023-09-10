import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser, updateProfileUser } from '../../redux/actions/profileAction';
import Avatar from '../Avatar';
import "./index.scss";
import { updateUserInfo } from '../../redux/reducers/authReducer';

function EditProfile({ user, setOnEdit }) {
  const [avatar, setAvatar] = useState(user?.avatar ? user.avatar : '');
  const [fullName, setFullName] = useState(user?.fullName ? user.fullName : '');
  const [mobile, setMobile] = useState(user?.mobile ? user.mobile : '');
  const [address, setAddress] = useState(user?.address ? user.address : '');
  const [website, setWebsite] = useState(user?.website ? user.website : '');
  const [story, setStory] = useState(user?.story ? user.story : '');
  const [gender, setGender] = useState(user?.gender ? user.gender : '');

  const userData = { fullName, mobile, address, website, story, gender };

  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);

  const changeAvatar = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    TransformFile(file);
  }

  const TransformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatar(reader.result);
      }
    } else {
      setAvatar("");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProfileUser({ auth, userData, avatar }));

    var id = user._id;
    const res = await dispatch(getProfileUser({ id, auth }));
    var infoUpdated = JSON.stringify(res.payload.data.user);

    await dispatch(updateUserInfo(infoUpdated));

    localStorage.setItem("userInfo", infoUpdated);
    setOnEdit(false);
  }

  return (
    <div className='edit-profile'>
      <form onSubmit={handleSubmit} >
        <button
          className="btn btn_close rounded-circle d-flex align-items-center p-1"
          onClick={() => setOnEdit(false)}
        >
          <span className="material-icons">
            close
          </span>
        </button>
        <div className="info_avatar">
          <Avatar src={avatar} alt="avatar" size='very-big' />
          <span>
            <i className="fas fa-camera" />
            <p>Change</p>
            <input type="file" name="file" id="file_up"
              accept="image/*" onChange={changeAvatar} />
          </span>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="fullname">Full Name</label>
          <div className="position-relative">
            <input type="text" className="form-control" id="fullname"
              name="fullName" value={fullName} onChange={e => setFullName(e.target.value)} />
            <small className="text-danger position-absolute"
              style={{ top: '50%', right: '5px', transform: 'translateY(-50%)' }}>
              {fullName.length}/25
            </small>
          </div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="mobile">Mobile</label>
          <input type="text" name="mobile"
            className="form-control" value={mobile} onChange={e => setMobile(e.target.value)} />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="address">Address</label>
          <input type="text" name="address"
            className="form-control" value={address} onChange={e => setAddress(e.target.value)} />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="website">Website</label>
          <input type="text" name="website"
            className="form-control" value={website} onChange={e => setWebsite(e.target.value)} />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="story">Story</label>
          <textarea name="story" cols="30" rows="3"
            className="form-control" value={story} onChange={e => setStory(e.target.value)} />

          <small className="text-danger d-block text-right">
            {story.length}/200
          </small>
        </div>

        <label htmlFor="gender">Gender</label>
        <div className="input-group-prepend px-0 mb-4">
          <select name="gender" id="gender"
            className="custom-select text-capitalize"
            value={gender} onChange={e => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* <input onClick={handleSubmit} /> */}

        <button className="btn btn-info w-100">Save</button>
      </form>

    </div>
  )
}

export default EditProfile;