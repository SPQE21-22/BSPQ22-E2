import { axios } from '../../../lib/axios';

import { Budget } from '../../../types';
import { BudgetFormData } from '../components/CreateBudgetModal';

export const createBudget = async (data: BudgetFormData): Promise<Budget> => {
  const result = await axios.post('/budgets', data);
  return result.data;
}