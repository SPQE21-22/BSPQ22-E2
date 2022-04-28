import { default as aaa } from 'axios';

import { API_URL } from '../config';

export const axios = aaa.create({
  withCredentials: true,
  baseURL: API_URL,
});