import { axios } from '../../../lib/axios';

import { Budget } from '../../../types';
import { BudgetFormData } from '../components/CreateBudgetModal';

type NewBudgetDTO = BudgetFormData & {
  userId: string;
};

export const createBudget = async (data: NewBudgetDTO): Promise<Budget> => {
  const result = await axios.post('/budgets', data);
  return result.data;
}