import { axios } from "../../../lib/axios";

import { User } from "../../../types";

export const getSelf = (): Promise<User> => {
  return axios.post('/auth/login/self');
};