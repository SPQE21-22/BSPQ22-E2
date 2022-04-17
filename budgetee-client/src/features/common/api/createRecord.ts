import { axios } from '../../../lib/axios';

import { Record } from '../../../types';
import { RecordFormData } from '../components/CreateRecordModal';

type NewRecordDTO = Omit<RecordFormData, 'category'> & {
  category: string;
};

export const createRecord = async (data: NewRecordDTO): Promise<Record> => {
  const result = await axios.post('/records', data);
  return result.data;
}