import { axios } from '../../../lib/axios';

import { Record } from '../../../types';
import { RecordFormData } from '../components/CreateRecordModal';

export const editRecord = async (recordId: string, data: RecordFormData): Promise<Record> => {
  const result = await axios.put(`/records/${recordId}`, data);
  return result.data;
}