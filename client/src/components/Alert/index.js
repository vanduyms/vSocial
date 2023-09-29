import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../../redux/reducers/alertReducer';
import Toast from "../Toast";


const Alert = () => {
  const { alert } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div>
      {
        alert.active &&
        <Toast msg={{ title: alert.message, body: alert.error }}
          handleShow={() => dispatch(setAlert({
            message: '',
            active: false,
          }))}
          bgColor="bg-danger" />
      }
    </div>
  )
}

export default Alert;