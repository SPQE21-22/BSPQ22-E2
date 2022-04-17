import { axios } from '../../../lib/axios';

import { Record } from '../../../types';
import { RecordFormData } from '../components/CreateRecordModal';

type EditRecordDTO = Omit<RecordFormData, 'category'> & {
  category: string;
};

export const editRecord = async (recordId: string, data: EditRecordDTO): Promise<Record> => {
  const result = await axios.put(`/records/${recordId}`, data);
  return result.data;
}