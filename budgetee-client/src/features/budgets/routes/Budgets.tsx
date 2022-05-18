import React from 'react';
import { PencilAltIcon } from '@heroicons/react/solid';

import { Sidebar } from '../components/Sidebar';
import { SearchProvider, useSearch } from '../context/SearchContext';

import { useData } from '../../../context/DataContext';
import { Budget } from '../../../types';
import { formatDate } from '../../../utils/helper';
import { EditBudgetModal } from '../../common/components/EditBudgetModal';
import { ActionType, useModals } from '../../../context/ModalContext';

type BudgetProps = {
  budget: Budget;
  setSelected: () => void;
};

const BudgetItem = ({ budget, setSelected }: BudgetProps) => {
  const { data } = useData();
  const { dispatch } = useModals();

  const toggleEditBudget = () => {
    setSelected();
    dispatch(ActionType.SHOW_EDIT_BUDGET);
  };

  // TODO use useMemo here?
  const currentBudget = data.records
    .filter(record => record.budgetId === budget.id)
    .reduce((prev, recordNew) => prev + recordNew.value, budget.initialBudget);

  return (
    <div className='relative group overflow-hidden cursor-pointer' onClick={toggleEditBudget}>
      <div className='rounded-md absolute opacity-0 h-full w-full bg-violet-200 group-hover:opacity-90 transition-all flex items-center justify-center'>
        <div className='p-2.5 rounded-full bg-violet-400 bg-opacity-50'>
          <PencilAltIcon className='h-7 w-7 text-violet-700' />
        </div>
      </div>
      <div className='p-2 my-0.5 flex flex-col sm:flex-row sm:justify-between transition-all'>
        <div>
          <span className='font-semibold'>{budget.name}</span>
          <div className={`text-sm font-medium ${currentBudget > 0 ? 'text-green-500' : 'text-red-500'}`}>
            €{currentBudget}
            <span className='text-xs ml-1 text-gray-600'>left out of ${budget.initialBudget}</span>
          </div>
        </div>
        <div className='flex sm:flex-col items-center justify-between sm:justify-center w-full sm:w-auto text-xs'>
          <span>{formatDate(budget.startDate)}</span>
          <span>{formatDate(budget.endDate)}</span>
        </div>
      </div>
    </div>
  );
};

const compareDate = (date1: string, compare: 'isBefore' | 'isAfter', date2: string) => {
  const date1Time = new Date(date1).getTime();
  const date2Time = new Date(date2).getTime();
  if (compare === 'isBefore') return date1Time <= date2Time;
  return date1Time >= date2Time;
};

const BudgetsContent = () => {
  const [selectedBudget, setSelectedBudget] = React.useState<Budget | null>(null);
  const { data } = useData();
  const { searchValue, startDateValue, endDateValue } = useSearch();
  
  const getFilteredBudgets = () => {
    let filteredBudgets = data.budgets.slice();

    if (searchValue && searchValue !== '')
      filteredBudgets = filteredBudgets.filter(budget => budget.name.toLowerCase().includes(searchValue.toLowerCase()));
    
    if (startDateValue && startDateValue !== '')
      filteredBudgets = filteredBudgets.filter(budget => compareDate(budget.startDate, 'isAfter', startDateValue));

    if (endDateValue && endDateValue !== '')
      filteredBudgets = filteredBudgets.filter(budget => compareDate(budget.endDate, 'isBefore', endDateValue));
    
    return filteredBudgets;
  };

  const getContent = () => {
    if (data.budgets.length === 0) {
      return (
        <div className='flex items-center justify-center p-5 text-lg'>
          No budgets created yet!
        </div>
      );
    }
    if (getFilteredBudgets().length === 0) {
      return (
        <div className='flex items-center justify-center p-5 text-lg'>
          No budgets found!
        </div>
      );
    }
    return getFilteredBudgets().map(budget => <BudgetItem key={budget.id} budget={budget} setSelected={() => setSelectedBudget(budget)} />);
  };

  return (
    <>
      <div className="h-full">
        <div className='flex flex-col gap-2 lg:grid lg:grid-cols-9 lg:gap-4 h-full w-full'>
          <Sidebar className='bg-violet-300' />
          <div className="mx-2 p-1 bg-white rounded-lg lg:col-span-7 flex flex-col divide-y divide-slate-200 h-full">
            {getContent()}
          </div>
        </div>
      </div>
      <EditBudgetModal budget={selectedBudget} />
    </>
  );
};

export const Budgets = () => {
  return (
    <SearchProvider>
      <BudgetsContent />
    </SearchProvider>
  );
};