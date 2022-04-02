import React from 'react';
import { ClipboardListIcon, CurrencyEuroIcon } from '@heroicons/react/solid';

import { BudgetsWidget } from '../components/BudgetsWidget';
import { RecordsWidget } from '../components/RecordsWidget';
import { CreateBudgetModal } from '../components/CreateBudgetModal';
import { Button } from '../../../components/Elements/Button';

const DashboardHeader = () => {
  const [budgetsOpen, setBudgetsOpen] = React.useState<boolean>(false);

  return (
    <div className='w-full bg-white shadow-sm shadow-slate-300 p-2 sm:hidden'>
      <CreateBudgetModal isOpen={budgetsOpen} setIsOpen={setBudgetsOpen} />
      <h1 className='font-medium text-xl'>Overview</h1>
      <div className='flex items-center justify-center gap-2 p-1'>
        <Button variant='inverse' size='sm' className='w-full' onClick={() => setBudgetsOpen(true)}>
          <ClipboardListIcon className='h-5 w-5 mr-2 hidden xs:block' />
          New budget
        </Button>
        <Button variant='inverse' size='sm' className='w-full'>
          <CurrencyEuroIcon className='h-5 w-5 mr-2 hidden xs:block' />
          New record
        </Button>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  return (
    <div className=''>
      <DashboardHeader />
      <div className='grid justify-items-center grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 p-2 sm:p-0'>
        <BudgetsWidget />
        <RecordsWidget />
      </div>
    </div>
  );
};