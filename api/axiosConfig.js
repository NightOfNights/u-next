import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:3010',
  headers: {
    'content-type': 'multipart/form-data',
  },
});

export default axiosConfig;
