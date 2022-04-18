import { axios } from "../../../lib/axios";

import { UserResponse } from "../types";

export const getSelf = (): Promise<UserResponse> => {
  return axios.get('/auth/self');
};