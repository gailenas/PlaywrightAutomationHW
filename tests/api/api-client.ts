import Axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const axios = Axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axios.interceptors.request.use((config) => {
  if (config.method === 'delete') {
    config.headers['api_key'] = process.env.API_KEY;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status ?? 'NO_RESPONSE';
    const method = error.config?.method?.toUpperCase();
    const url = error.config?.url;
    console.error(`[API Error] ${method} ${url} → ${status}`);
    return Promise.reject(error);
  },
);

export default axios;
