import { axios } from '../../../lib/axios';

import { Record } from '../../../types';
import { RecordFormData } from '../components/CreateRecordModal';

export const createRecord = async (data: RecordFormData): Promise<Record> => {
  const result = await axios.post('/records', data);
  return result.data;
}