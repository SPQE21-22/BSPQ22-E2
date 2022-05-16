import { axios } from '../../../lib/axios';

export const deleteUser = async () => {
  const result = await axios.delete(`/auth/self`);
  return result.data;
}