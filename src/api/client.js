import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// client.interceptors.request.use((config) => {
//   console.log(config);
// }, (error) => Promise.reject(error));

export default client;
