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

const resetUsersPsw = async (data) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log('reset req: ', data);
  const response = await axios.put(`${baseUrl}/reset`, data, config);
  return response.data;
};

const createNewUser = (name, username, password, admin) => {
  console.log('create user req: ', name, username, password, admin);
};

const usersTools = { setToken, changePw, resetUsersPsw, createNewUser };
export default usersTools;
