import { PencilAltIcon } from '@heroicons/react/solid';

import { Budget } from '../../../types';
import { DashboardWidget } from './DashboardWidget';

import { formatDate } from '../../../utils/helper';
import { useData } from '../../../context/DataContext';

type BudgetProps = {
  budget: Budget;
}

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

export const BudgetsWidget = () => {
  const { data } = useData();

  // TODO render "empty" state when there are no budgets, differentiate between empty and unloaded
  return (
    <DashboardWidget title="Latest budgets" to="/budgets" linkText="See all budgets">
      <div className='flex flex-col divide-y divide-slate-200'>
        {/* TODO order by date */}
        {data.budgets.map(budget => <BudgetItem key={budget.id} budget={budget} />)}
      </div>
    </DashboardWidget>
  );
};