import Axios from 'axios';

import { API_URL } from '../config';
console.log(API_URL);


export const axios = Axios.create({
  baseURL: API_URL,
});

axios.defaults.withCredentials = true;