import axios from 'axios';
//const baseUrl = '/api/login'; // prod
const baseUrl = 'http://localhost:3001/api/users' // dev
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const changePw =  async (data) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${data.user}`, data, config);
  return response.data;
};

const usersTools = { setToken, changePw };
export default usersTools;

/*
// update a certain field for certain blog
const update = (id, field, newValue) => {
  const config = {
    headers: { Authorization: token },
  };
  const data = { field: field, newValue: newValue };
  const req = axios.put(`${baseUrl}/${id}`, data, config);
  return req.then(res => res.data);
};
*/
