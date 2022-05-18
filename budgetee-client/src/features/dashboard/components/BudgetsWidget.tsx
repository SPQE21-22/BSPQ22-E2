import React from 'react';
import { ClipboardListIcon, PencilAltIcon } from '@heroicons/react/solid';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

import { Budget } from '../../../types';
import { DashboardWidget } from './DashboardWidget';

import { formatDate } from '../../../utils/helper';
import { LoadState, useData } from '../../../context/DataContext';
import { Spinner } from '../../../components/Elements/Spinner';
import { EditBudgetModal } from '../../common/components/EditBudgetModal';
import { ActionType, useModals } from '../../../context/ModalContext';

type BudgetProps = {
  budget: Budget;
  setSelected: () => void;
}

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
      <div className='p-2 my-0.5 flex flex-col transition-all'>
        <span className='font-semibold'>{budget.name}</span>
        <div className={`text-sm font-medium ${currentBudget > 0 ? 'text-green-500' : 'text-red-500'}`}>
          €{currentBudget}
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
  const [selectedBudget, setSelectedBudget] = React.useState<Budget | null>(null);
  const { data } = useData();

  // TODO edition of budgets: https://stackoverflow.com/questions/55806877/how-to-pass-data-to-a-form-in-reactjs

  const getContent = () => {
    if (data.budgets.length > 0) {
      // TODO order by date
      return data.budgets.map(budget => <BudgetItem key={budget.id} budget={budget} setSelected={() => setSelectedBudget(budget)} />);
    }
    if (data.loadState === LoadState.NOT_LOADED) {
      return (
        <div className='flex flex-col items-center justify-center h-full'>
          <Spinner size='lg' />
        </div>
      );
    }
    if (data.loadState === LoadState.LOADING_ERROR) {
      return (
        <div className='flex flex-col items-center justify-center h-full'>
          <div className='mb-6 p-4 bg-red-100 rounded-full'>
            <ExclamationCircleIcon className='h-16 w-16 text-rose-400' />
          </div>
          <h3 className='font-medium text-xl'>There was an error loading your data :(</h3>
        </div>
      )
    }
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <div className='mb-3 p-4 bg-violet-200 rounded-full'>
          <ClipboardListIcon className='h-16 w-16 text-violet-500' />
        </div>
        <h3 className='font-medium text-xl'>No budgets created yet!</h3>
      </div>
    );
  };

  return (
    <>
      <DashboardWidget title="Latest budgets" to="/budgets" linkText="See all budgets">
        <div className='flex flex-col divide-y divide-slate-200 h-full bg-white p-1 rounded-t-xl'>
          {getContent()}
        </div>
      </DashboardWidget>
      <EditBudgetModal budget={selectedBudget}/>
    </>
  );
};