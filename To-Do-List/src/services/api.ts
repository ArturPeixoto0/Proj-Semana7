import axios from 'axios';

export const api = axios.create({
   baseURL: 'https://tarefas/',
   withCredentials: false,
   headers: {
      //'Authorization': '',
      'Content-Type': 'application/json',
   },
});