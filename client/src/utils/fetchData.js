import axios from "axios";
import { host } from "./constants";

export const getDataAPI = async (url, token) => {
  const res = axios.get(`${host}/api/${url}`, {
    headers: { Authorization: token }
  });
  return res;
}

export const deleteDataAPI = async (url, token) => {
  const res = axios.delete(`${host}/api/${url}`, {
    headers: { Authorization: token }
  });
  return res;
}

export const postDataAPI = async (url, post, token) => {
  const res = axios.post(`${host}/api/${url}`, post, {
    headers: { Authorization: token }
  });
  return res;
}

export const postDataAPIWithoutAuth = async (url, post) => {
  const res = axios.post(`${host}/api/${url}`, post);

  return res;
}

export const putDataAPI = async (url, post, token) => {
  const res = axios.put(`${host}/api/${url}`, post, {
    headers: { Authorization: token }
  });
  return res;
}

export const postAPI = async (url, token) => {
  const res = axios.post(`${host}/api/${url}`, {
    headers: { Authorization: token }
  });
  return res;
}