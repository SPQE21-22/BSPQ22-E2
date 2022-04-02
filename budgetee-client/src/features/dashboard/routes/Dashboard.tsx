import { ClipboardListIcon, CurrencyEuroIcon } from '@heroicons/react/solid';

import { BudgetsWidget } from '../components/BudgetsWidget';
import { RecordsWidget } from '../components/RecordsWidget';
import { CreateBudgetModal } from '../../common/components/CreateBudgetModal';
import { Button } from '../../../components/Elements/Button';
import { ActionType, useModals } from '../../../context/ModalContext';
import { CreateRecordModal } from '../../common/components/CreateRecordModal';

const DashboardHeader = () => {
  const { dispatch } = useModals();

  return (
    <div className='w-full bg-white shadow-sm shadow-slate-300 p-2 sm:hidden'>
      {/* TODO move modals to higher-order component */}
      <CreateBudgetModal />
      <CreateRecordModal />
      <h1 className='font-medium text-xl'>Overview</h1>
      <div className='flex items-center justify-center gap-2 p-1'>
        <Button variant='inverse' size='sm' className='w-full' onClick={() => dispatch(ActionType.SHOW_NEW_BUDGET)}>
          <ClipboardListIcon className='h-5 w-5 mr-2 hidden xs:block' />
          New budget
        </Button>
        <Button variant='inverse' size='sm' className='w-full' onClick={() => dispatch(ActionType.SHOW_NEW_RECORD)}>
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