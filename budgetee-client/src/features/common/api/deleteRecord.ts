import { axios } from '../../../lib/axios';

export const deleteRecord = async (recordId: string) => {
  const result = await axios.delete(`/records/${recordId}`);
  return result.data;
}