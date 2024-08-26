import axios from 'axios';
const api = axios.create({
  baseURL: 'https://per-pic.vercel.app/',
});

export default api;
