import axios from 'axios';
const api = axios.create({
  baseURL: 'https://per-pic-api.vercel.app',
});

export default api;
