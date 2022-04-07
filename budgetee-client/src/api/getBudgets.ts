import { axios } from '../lib/axios';

import { Budget } from '../types';

export const getBudgets = async (): Promise<Budget[]> => {
  const result = await axios.get('/budgets');
  return result.data;
}