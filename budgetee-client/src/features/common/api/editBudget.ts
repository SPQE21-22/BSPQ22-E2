import { axios } from '../../../lib/axios';

import { Budget } from '../../../types';
import { BudgetFormData } from '../components/CreateBudgetModal';

export const editBudget = async (budgetId: string, data: BudgetFormData): Promise<Budget> => {
  const result = await axios.put(`/budgets/${budgetId}`, data);
  return result.data;
}