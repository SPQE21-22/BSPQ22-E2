import React from 'react';
import { Budget, Record } from '../types';

type ProviderProps = {
  children: React.ReactNode;
};

export enum LoadState {
  NOT_LOADED,
  ALL_LOADED,
};

type DataState = {
  loadState: LoadState;
  budgets: Budget[];
  records: Record[];
};

const baseState: DataState = {
  loadState: LoadState.NOT_LOADED,
  budgets: [],
  records: [],
};

type BudgetId = string;
type RecordId = string;

export type Action = 
  | { type: 'loadData', payload: { budgets: Budget[], records: Record[] }}
  | { type: 'createBudget', payload: Budget }
  | { type: 'editBudget', payload: Budget }
  | { type: 'removeBudget', payload: BudgetId } // budget ID
  | { type: 'createRecord', payload: Record }
  | { type: 'editRecord', payload: Record }
  | { type: 'removeRecord', payload: RecordId };  // record ID

type ContextValue = {
  data: DataState;
  dispatch: React.Dispatch<Action>;
};

const DataContext = React.createContext<ContextValue>({} as ContextValue);

const dataReducer = (state: DataState, action: Action): DataState => {
  const { budgets, records } = state;
  const { type, payload } = action;

  switch (type) {
    case 'loadData':
      return {
        ...state,
        loadState: LoadState.ALL_LOADED,
        budgets: payload.budgets,
        records: payload.records
      };
    case 'createBudget':
      return {
        ...state,
        budgets: budgets.concat(payload)
      };
    case 'editBudget':
      return {
        ...state,
        budgets: budgets.map(budget => payload.id === budget.id ? payload : budget),
      };
    case 'removeBudget':
      return {
        ...state,
        budgets: budgets.filter(budget => budget.id !== payload),
      };
    case 'createRecord':
      return {
        ...state,
        records: records.concat(payload)
      };
    case 'editRecord':
      return {
        ...state,
        records: records.map(record => payload.id === record.id ? payload : record),
      };
    case 'removeRecord':
      return {
        ...state,
        records: records.filter(record => record.id !== payload)
      };
    default:
      return state;
  }
};

export const DataProvider = ({ children }: ProviderProps) => {
  const [data, dispatch] = React.useReducer(dataReducer, baseState);
  const value = { data, dispatch };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used withing a DataProvider');
  }
  return context;
};