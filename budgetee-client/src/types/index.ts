export type Budget = {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  initialBudget: number;
};

export type Record = {
  id: string;
  name: string;
  category: string;
  value: number;
  date?: string;
  extraInfo?: string;
  paymentType?: string;
  place?: string;
  budgetId: number;
};