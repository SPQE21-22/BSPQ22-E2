import React from 'react';
import { CurrencyEuroIcon, ExclamationCircleIcon } from '@heroicons/react/outline';
import { PencilAltIcon } from '@heroicons/react/solid';

import { Record } from '../../../types';
import { DashboardWidget } from "./DashboardWidget";

import { formatDate } from '../../../utils/helper';
import { LoadState, useData } from '../../../context/DataContext';
import { Spinner } from '../../../components/Elements/Spinner';
import { EditRecordModal } from '../../common/components/EditRecordModal';
import { ActionType, useModals } from '../../../context/ModalContext';
import { categories, CategoryIcon } from '../../records/components/CategoryIcon';

type RecordProps = {
  record: Record;
  setSelected: () => void;
}

const RecordItem = ({ record, setSelected }: RecordProps) => {
  const { dispatch } = useModals();

  // TODO different color for zero-value records
  const getCleanValue = (value: number): string => value > 0 ? `€${value}` : `-€${-value}`;

  const toggleEditRecord = () => {
    setSelected();
    dispatch(ActionType.SHOW_EDIT_RECORD);
  };

  return (
    <div className='relative group overflow-hidden cursor-pointer' onClick={toggleEditRecord}>
      <div className='rounded-md absolute opacity-0 h-full w-full bg-violet-200 group-hover:opacity-90 transition-all flex items-center justify-center'>
        <div className='p-2.5 rounded-full bg-violet-400 bg-opacity-50'>
          <PencilAltIcon className='h-7 w-7 text-violet-700' />
        </div>
      </div>
      <div className='grid grid-cols-5'>
        <div className='col-span-1 flex items-center justify-center'>
          <CategoryIcon category={categories.find(category => category.name === record.category)} />
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
  const [selectedRecord, setSelectedRecord] = React.useState<Record | null>(null);
  const { data } = useData();

  const getContent = () => {
    if (data.budgets.length > 0) {
      // TODO order by date
      return data.records.map(record => <RecordItem key={record.id} record={record} setSelected={() => setSelectedRecord(record)} />);
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
          <CurrencyEuroIcon className='h-16 w-16 text-violet-500' />
        </div>
        <h3 className='font-medium text-xl'>No records created yet!</h3>
      </div>
    );
  };

  return (
    <>
      <DashboardWidget title="Latest records" to="/records" linkText='See all records'>
        <div className='flex flex-col divide-y divide-slate-200 h-full bg-white p-1 rounded-t-xl'>
          {getContent()}
        </div>
      </DashboardWidget>
      <EditRecordModal record={selectedRecord} />
    </>
  );
};