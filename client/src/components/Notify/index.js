import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '../Loading';
import Toast from '../Toast';

function Notify() {
  const { loading, error, userInfo, success } = useSelector(state => state.auth);

  return (
    <div >
      {loading && <Loading />}
      {
        success &&
        <Toast
          msg={{ title: "Success", body: userInfo.data.msg }}
          handleShow=""
          bgColor="bg-success"
        />
      }

      {
        error && <Toast
          msg={{ title: "Error", body: `${error}` }}
          handleShow=""
          bgColor="bg-danger"
        />
      }
    </div>
  )
}

export default Notify;