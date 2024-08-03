import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { userLogin } from '../../redux/actions/authAction';
import "./index.scss";
import Loading from '../../components/Loading';

function Login() {
  const { auth } = useSelector(state => state);
  const { register, handleSubmit } = useForm();
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.userToken) navigate("/")
  }, [auth.userToken, navigate])


  const submitForm = (data) => {
    data.email = email.toLowerCase();
    dispatch(userLogin({ data, dispatch }));
  }

  return (
    <div className='main auth_page login_page'>
      {auth.loading && <Loading />}
      <form onSubmit={handleSubmit(submitForm)}>
        <h3 className='text-uppercase text-center'>V_Social</h3>
        <div className="mb-3 form-group">
          <label htmlFor="exampleInputEmail1" className="form-label">Email:</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} required />
          {/* {
            !validEmail(email)
              ?
              <small style={{ color: 'red' }}>Email format is incorrect!</small>
              :
              <small></small>
          } */}
        </div>
        <div className="mb-3 form-group">
          <label htmlFor="exampleInputPassword1" className="form-label">Mật khẩu:</label>
          <div className='pass_input'>
            <input type={show ? "text" : "password"} className="form-control" id="exampleInputPassword1" {...register("password")} required />
            <small onClick={() => setShow(!show)}>
              {show ? 'Ẩn' : 'Hiện'}
            </small>
          </div>
        </div>
        <button type="submit" className="btn btn-dark w-100 rounded-pill" disabled={auth.loading}>Đăng nhập</button>

        <p className='my-2'>
          Bạn chưa có tài khoản ? <Link to="/register" style={{}} >Đăng ký</Link>
        </p>
        <p className='my-2'>
          Quên mật khẩu ? <Link to="/forgotPassword" style={{}} >Lấy lại mật khẩu</Link>
        </p>
      </form>
    </div>
  )
}

export default Login;