import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../redux/reducers/alertReducer';

function Alert() {
  const { auth, post, alert } = useSelector(state => state);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (auth.message) {
      dispatch(setAlert(auth.message))
    }

    if (alert.message !== "") {
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 2000);
    }

  }, [auth, post, alert, dispatch]);

  useEffect(() => {

  }, [alert]);

  return (
    show && (
      <div className="alert alert-success position-fixed" style={{ bottom: '10px', right: '10px' }}>
        {alert.message}
      </div>
    )
  );
}

export default Alert;