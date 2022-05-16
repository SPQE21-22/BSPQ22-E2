import { axios } from '../../../lib/axios';

import { User } from '../../../types';
import { UserFormData } from '../components/EditUserModal';

export const editUser = async (data: UserFormData): Promise<User> => {
  const result = await axios.put(`/auth/self`, data);
  return result.data;
}