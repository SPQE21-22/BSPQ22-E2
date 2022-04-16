import { axios } from '../../../lib/axios';

export const deleteBudget = async (budgetId: string) => {
  const result = await axios.delete(`/budgets/${budgetId}`);
  return result.data;
}