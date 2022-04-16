import { axios } from "../../../lib/axios";

import { UserResponse } from '../types';

export type RegisterCredentialsDTO = {
  username: string;
  password: string;
  name: string;
  email: string;
  birthDate: string;
};

export const register = (data: RegisterCredentialsDTO): Promise<UserResponse> => {
  return axios.post('/auth/register', data);
};