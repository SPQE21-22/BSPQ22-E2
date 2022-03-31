export type Budget = {
  id: number;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  initialBudget: number;
};

export type Record = {
  id: number;
  name: string;
  category: string;
  value: number;
  date: string;
  extraInfo?: string;
  paymentType?: string;
  place?: string;
  budgetId: number;
};