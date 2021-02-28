import axios from 'axios';
const baseUrl = '/api/passwords';
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

// get all
const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then(res => res.data);
};

// create
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

// update a certain field for certain blog
const update = (id, field, newValue) => {
  const data = { field: field, newValue: newValue };
  const req = axios.put(`${baseUrl}/${id}`, data);
  return req.then(res => res.data);
};

// delete blog by id
const erase = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const req = axios.delete(`${baseUrl}/${id}`, config);
  return req.then(res => res.data);
};

const pswTools = { getAll, create, setToken, update, erase };
export default pswTools;
