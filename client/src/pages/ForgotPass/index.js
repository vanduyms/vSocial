import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendResetPassword } from '../../redux/actions/authAction';

function ForgotPass() {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendResetPassword({ email, dispatch }))
  };

  return (
    <div className='main auth_page login_page'>
      <form onSubmit={e => handleSubmit(e)}>
        <h3 className='text-uppercase text-center'>V_Social</h3>
        {
          !auth.resetInfo ? (
            <>
              <div className="mb-3 form-group">
                <label htmlFor="exampleInputEmail1" className="form-label">Email:</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
              </div>

              <button type="submit" className="btn btn-dark w-100 rounded-pill" >Đặt lại mật khẩu</button>
            </>
          ) :
            <p className='py-2'>Link reset mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra email</p>
        }
        <p className='my-2'>
          Bạn đã có tài khoản ? <Link to="/register" style={{}} >Đăng nhập</Link>
        </p>
      </form>
    </div>
  )
}

export default ForgotPass;