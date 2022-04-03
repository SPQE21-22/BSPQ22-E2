import { CurrencyEuroIcon, LibraryIcon, PencilAltIcon } from '@heroicons/react/outline';

import { Record } from '../../../types';
import { DashboardWidget } from "./DashboardWidget";

import { formatDate } from '../../../utils/helper';
import { LoadState, useData } from '../../../context/DataContext';
import { Spinner } from '../../../components/Elements/Spinner';

type RecordProps = {
  record: Record;
}

const RecordItem = ({ record }: RecordProps) => {
  // TODO different color for zero-value records
  const getCleanValue = (value: number): string => value > 0 ? `€${value}` : `-€${-value}`;

  return (
    <div className='relative group overflow-hidden cursor-pointer'>
      <div className='rounded-md absolute opacity-0 h-full w-full bg-violet-200 group-hover:opacity-90 transition-all flex items-center justify-center'>
        <div className='p-2.5 rounded-full bg-violet-400 bg-opacity-50'>
          <PencilAltIcon className='h-7 w-7 text-violet-700' />
        </div>
      </div>
      <div className='grid grid-cols-5'>
        <div className='col-span-1 flex items-center justify-center'>
          <div className='p-3 rounded-full bg-violet-200'>
            <LibraryIcon className='h-7 w-7 text-violet-600' />
          </div>
        </div>
        <div className='col-span-4 p-2 my-0.5 flex flex-col transition-all'>
          <div className='font-medium flex items-center justify-between'>
            <span>{record.name}</span>
            <span className={`text-sm ${record.value > 0 ? 'text-green-500' : 'text-red-500'}`}>{getCleanValue(record.value)}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='font-medium text-sm text-gray-600'>{record.category}</span>
            <span className='text-xs text-gray-600'>{formatDate(record.date)}</span>
          </div>
          <div className='flex items-center justify-between w-full text-xs'>
            <span>{record.extraInfo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RecordsWidget = () => {
  const { data } = useData();

  const getContent = () => {
    if (data.budgets.length > 0) {
      // TODO order by date
      return data.records.map(record => <RecordItem key={record.id} record={record} />);
    }
    if (data.loadState === LoadState.NOT_LOADED) {
      return (
        <div className='flex flex-col items-center justify-center h-full'>
          <Spinner size='lg' />
        </div>
      );
    }
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <div className='mb-3 p-4 bg-violet-200 rounded-full'>
          <CurrencyEuroIcon className='h-16 w-16 text-violet-500' />
        </div>
        <h3 className='font-medium text-xl'>No records created yet!</h3>
      </div>
    );
  };

  return (
    <DashboardWidget title="Latest records" to="/records" linkText='See all records'>
      <div className='flex flex-col divide-y divide-slate-200 h-full'>
        {getContent()}
      </div>
    </DashboardWidget>
  );
};