import axios from 'axios';
const baseUrl = '/api/login'; // prod
//const baseUrl = 'http://localhost:3001/api/users' // dev
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
  const response = await axios.put(`${baseUrl}/reset`, data, config);
  return response.data;
};

const createNewUser = async (data) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.post(baseUrl, data, config);
    return response.data;
};

const usersTools = { setToken, changePw, resetUsersPsw, createNewUser };
export default usersTools;
