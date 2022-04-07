import React from 'react';
import { PencilAltIcon } from '@heroicons/react/solid';

import { Sidebar } from '../components/Sidebar';
import { SearchProvider, useSearch } from '../context/SearchContext';

import { useData } from '../../../context/DataContext';
import { Budget } from '../../../types';
import { formatDate } from '../../../utils/helper';

type BudgetProps = {
  budget: Budget;
};

const BudgetItem = ({ budget }: BudgetProps) => {
  return (
    <div className='relative group overflow-hidden cursor-pointer'>
      <div className='rounded-md absolute opacity-0 h-full w-full bg-violet-200 group-hover:opacity-90 transition-all flex items-center justify-center'>
        <div className='p-2.5 rounded-full bg-violet-400 bg-opacity-50'>
          <PencilAltIcon className='h-7 w-7 text-violet-700' />
        </div>
      </div>
      <div className='p-2 my-0.5 flex flex-col transition-all'>
        <span className='font-semibold'>{budget.name}</span>
        {/* TODO calculate total balances */}
        <div className='text-sm font-medium text-green-500'>
          €{budget.initialBudget}
          <span className='text-xs ml-1 text-gray-600'>left out of ${budget.initialBudget}</span>
        </div>
        <div className='flex items-center justify-between w-full text-xs'>
          <span>{formatDate(budget.startDate)}</span>
          <span>{formatDate(budget.endDate)}</span>
        </div>
      </div>
    </div>
  );
};

const BudgetsContent = () => {
  const { data } = useData();
  const { searchValue } = useSearch();

  const filteredBudgets = searchValue && searchValue !== ''
    ? data.budgets.filter(budget => budget.name.toLowerCase().includes(searchValue.toLowerCase()))
    : data.budgets;

  return (
    <div className="h-full">
      <div className='flex flex-col gap-2 lg:grid lg:grid-cols-9 lg:gap-8 h-full w-full'>
        <Sidebar className='bg-violet-200' />
        <div className="mx-2 bg-white rounded-lg lg:col-span-7 flex flex-col divide-y divide-slate-200 h-full">
          {filteredBudgets.map(budget => <BudgetItem key={budget.id} budget={budget} />)}
        </div>
      </div>
    </div>
  );
};

export const Budgets = () => {
  return (
    <SearchProvider>
      <BudgetsContent />
    </SearchProvider>
  );
};