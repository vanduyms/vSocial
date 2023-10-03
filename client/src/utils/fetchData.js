import axios from "axios";

export const getDataAPI = async (url, token) => {
  const res = axios.get(`https://vsocial-backend.onrender.com/api/${url}`, {
    headers: { Authorization: token }
  });
  return res;
}

export const deleteDataAPI = async (url, token) => {
  const res = axios.delete(`https://vsocial-backend.onrender.com/api/${url}`, {
    headers: { Authorization: token }
  });
  return res;
}

export const postDataAPI = async (url, post, token) => {
  const res = axios.post(`https://vsocial-backend.onrender.com/api/${url}`, post, {
    headers: { Authorization: token }
  });
  return res;
}

export const putDataAPI = async (url, post, token) => {
  const res = axios.put(`https://vsocial-backend.onrender.com/api/${url}`, post, {
    headers: { Authorization: token }
  });
  return res;
}

export const patchDataAPI = async (url, post, token) => {
  const res = axios.patch(`https://vsocial-backend.onrender.com/api/${url}`, post, {
    headers: { Authorization: token }
  });
  return res;
}

export const postAPI = async (url, token) => {
  const res = axios.post(`https://vsocial-backend.onrender.com/api/${url}`, {
    headers: { Authorization: token }
  });
  return res;
}