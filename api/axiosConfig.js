import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:3010',
});

export default axiosConfig;
