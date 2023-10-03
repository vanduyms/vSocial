import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { resetPassword } from '../../redux/actions/authAction';

function ResetPassword() {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { id, token } = useParams();
  const { auth } = useSelector(state => state);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ id, token, password, dispatch }))
  };

  return (
    <div className='main auth_page login_page'>
      <form onSubmit={e => handleSubmit(e)}>
        <h3 className='text-uppercase text-center'>V_Social</h3>
        {
          !auth.resetInfo ? (
            <>
              <div className="mb-3 form-group">
                <label htmlFor="exampleInputPassword1" className="form-label">Mật khẩu:</label>
                <div className='pass_input'>
                  <input
                    type={show ? "text" : "password"} className="form-control" id="exampleInputPassword1"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <small onClick={() => setShow(!show)}>
                    {show ? 'Ẩn' : 'Hiện'}
                  </small>
                </div>
              </div>

              <button type="submit" className="btn btn-dark w-100 rounded-pill" >{auth.loading ? <Loading /> : "Đặt lại mật khẩu"}</button>
            </>
          ) : <p>
            Mật khẩu của bạn đã được thay đổi thành công. <Link to="/" style={{}} >Đăng nhập</Link>
          </p>
        }
        <p className='my-2'>
          Bạn đã có tài khoản ? <Link to="/" style={{}} >Đăng nhập</Link>
        </p>
      </form>
    </div>
  )
}

export default ResetPassword;