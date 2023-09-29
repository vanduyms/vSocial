import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { userLogin } from '../../redux/actions/authAction';
import "./index.scss";

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
          <label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
          <div className='pass_input'>
            <input type={show ? "text" : "password"} className="form-control" id="exampleInputPassword1" {...register("password")} required />
            <small onClick={() => setShow(!show)}>
              {show ? 'Hide' : 'Show'}
            </small>
          </div>
        </div>
        <button type="submit" className="btn btn-dark w-100 rounded-pill" disabled={auth.loading}>Login</button>

        <p className='my-2'>
          You don't have account ? <Link to="/register" style={{}} >Register Now</Link>
        </p>
      </form>
    </div>
  )
}

export default Login;