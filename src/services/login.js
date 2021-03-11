import axios from 'axios';
//const baseUrl = '/api/login'; // prod
const baseUrl = 'http://localhost:3001/api/login' // dev

const login =  async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const loginTools = { login };
export default loginTools;
