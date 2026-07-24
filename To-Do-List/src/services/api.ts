import axios from 'axios';

export const api = axios.create({
   baseURL: 'https://task',
   withCredentials: false,
   headers: {
      //'Authorization': '',
      'Content-Type': 'application/json',
   },
});