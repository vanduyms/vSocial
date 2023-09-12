import axios from "axios";

export const getDataAPI = async (url, token) => {
  const res = axios.get(`http://localhost:3001/api/${url}`, {
    headers: { Authorization: token }
  });
  return res;
}

export const deleteDataAPI = async (url, token) => {
  const res = axios.delete(`http://localhost:3001/api/${url}`, {
    headers: { Authorization: token }
  });
  return res;
}

export const postDataAPI = async (url, post, token) => {
  const res = axios.post(`http://localhost:3001/api/${url}`, post, {
    headers: { Authorization: token }
  });
  return res;
}

export const putDataAPI = async (url, post, token) => {
  const res = axios.put(`http://localhost:3001/api/${url}`, post, {
    headers: { Authorization: token }
  });
  return res;
}

export const patchDataAPI = async (url, post, token) => {
  const res = axios.patch(`http://localhost:3001/api/${url}`, post, {
    headers: { Authorization: token }
  });
  return res;
}

export const postAPI = async (url, token) => {
  const res = axios.post(`http://localhost:3001/api/${url}`, {
    headers: { Authorization: token }
  });
  return res;
}