import { axios } from '../../../lib/axios';

import { Record } from '../../../types';

export const getRecords = async (): Promise<Record[]> => {
  const result = await axios.get('/records');
  return result.data;
}