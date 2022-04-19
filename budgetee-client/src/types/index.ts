// Entities

export type Budget = {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  initialBudget: number;
  userId: string;
};

export type RecordCategory = 
  'Other' |
  'Income' |
  'Housing' |
  'Clothing' |
  'Food & Drinks' |
  'Entertainment' |
  'Transportation' |
  'Financial expenses';

export type Record = {
  id: string;
  name: string;
  category: RecordCategory;
  value: number;
  date?: string;
  extraInfo?: string;
  paymentType?: string;
  place?: string;
  budgetId: string;
};

export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  birthDate: string;
};


// Other
// Used when waiting for a request to solve
export type RequestLoadStates = 'unloaded' | 'loading' | 'success' | 'failure';