import { ClipboardListIcon, CurrencyEuroIcon } from '@heroicons/react/solid';

import { DashboardWidget } from '../components/DashboardWidget';
import { Button } from '../../../components/Elements/Button';

const DashboardHeader = () => {
  return (
    <div className='w-full bg-white shadow-sm shadow-slate-300 p-2'>
      <h1 className='font-medium text-xl'>Overview</h1>
      <div className='flex items-center justify-center gap-2 p-1'>
        <Button variant='inverse' size='sm' className='w-full'>
          <ClipboardListIcon className='h-5 w-5 mr-2'/>
          New budget
        </Button>
        <Button variant='inverse' size='sm' className='w-full'>
          <CurrencyEuroIcon className='h-5 w-5 mr-2'/>
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
      <div className='flex flex-col items-center gap-4 p-2 sm:p-0'>
        <DashboardWidget title='Budgets'/>
        <DashboardWidget title='Records'/>
      </div>
    </div>
  );
};