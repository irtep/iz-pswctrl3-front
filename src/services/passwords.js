import axios from 'axios';
//const baseUrl = '/api/passwords';  // prod
const baseUrl = 'http://localhost:3001/api/passwords'; // dev
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

// get all
const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
  const req = axios.get(baseUrl, config);
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
  const config = {
    headers: { Authorization: token },
  };
  const data = { field: field, newValue: newValue };
  const req = axios.put(`${baseUrl}/${id}`, data, config);
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
