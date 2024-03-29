import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { userRegister } from '../../redux/actions/authAction';
import "./index.scss";
import Loading from '../../components/Loading';

function Register() {
  const { auth } = useSelector(state => state);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (auth.userToken) navigate('/');
  }, [navigate, auth.userToken]);

  const dispatch = useDispatch();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitForm = (data) => {
    data.email = data.email.toLowerCase();
    data.password = password;
    dispatch(userRegister({ data, dispatch }));
  }

  return (
    <div className='main auth_page register_page'>
      {auth.loading && <Loading />}
      <form onSubmit={handleSubmit(submitForm)}>
        <h3 className='text-uppercase text-center'>V_Social</h3>
        <div className="mb-3 form-group">
          <label htmlFor="InputFullName" className="form-label">Họ và tên:</label>
          <input type="text" className="form-control" id="InputFullName" {...register('fullName')} required />
        </div>
        <div className="mb-3 form-group">
          <label htmlFor="InputUsername" className="form-label">Username:</label>
          <input type="text" className="form-control" id="InputUsername"  {...register('username')} required />
        </div>
        <div className="mb-3 form-group">
          <label htmlFor="InputGender" className="form-label">Giới tính:</label>
          <select style={{ marginLeft: 12, outline: 'none' }}  {...register('gender')} required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-3 form-group">
          <label htmlFor="InputEmail1" className="form-label">Email:</label>
          <input type="email" className="form-control" id="InputEmail1"  {...register('email')} required />
        </div>
        <div className="mb-3 form-group">
          <label htmlFor="InputPassword" className="form-label">Mật khẩu:</label>
          <div className='pass_input'>
            <input type={show1 ? "text" : "password"} className="form-control" id="InputPassword" value={password} onChange={e => setPassword(e.target.value)} required />
            <small onClick={() => setShow1(!show1)}>
              {show1 ? 'Ẩn' : 'Hiện'}
            </small>
          </div>
        </div>
        <div className="mb-3 form-group">
          <label htmlFor="InputconfirmPassword" className="form-label">Xác nhận mật khẩu:</label>
          <div className='pass_input'>
            <input type={show2 ? "text" : "password"} className="form-control" id="InputconfirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            <small onClick={() => setShow2(!show2)}>
              {show2 ? 'Ẩn' : 'Hiện'}
            </small>
          </div>
        </div>
        <div className="mb-3 form-group">
          {
            password !== confirmPassword
              ? <small style={{ color: 'red' }}>Mật khẩu không khớp!</small>
              : <small></small>
          }
        </div>
        <button
          type="submit"
          className="btn btn-dark w-100 rounded-pill"
          onClick={handleSubmit}
          disabled={
            password === confirmPassword ? false : true
          }
        >
          Đăng ký
        </button>

        <p className='my-2'>
          Bạn đã có tài khoản ? <Link to="/" style={{}} >Đăng nhập ngay</Link>
        </p>
      </form>
    </div>
  )
}

export default Register;