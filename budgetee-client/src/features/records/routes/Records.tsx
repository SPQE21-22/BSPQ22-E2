import React from 'react';
import { PencilAltIcon } from '@heroicons/react/solid';

import { Sidebar } from '../components/Sidebar';
import { SearchProvider, useSearch } from '../context/SearchContext';

import { useData } from '../../../context/DataContext';
import { Record } from '../../../types';
import { formatDate } from '../../../utils/helper';
import { EditRecordModal } from '../../common/components/EditRecordModal';
import { CategoryIcon } from '../components/CategoryIcon';
import { ActionType, useModals } from '../../../context/ModalContext';


type RecordProps = {
  record: Record;
  setSelected: () => void;
};

const RecordItem = ({ record, setSelected }: RecordProps) => {
  const { dispatch } = useModals();

  const toggleEditRecord = () => {
    setSelected();
    dispatch(ActionType.SHOW_EDIT_RECORD);
  };

  // TODO different color for zero-value records
  const getCleanValue = (value: number): string => value > 0 ? `€${value}` : `-€${-value}`;

  return (
    <div className='relative group overflow-hidden cursor-pointer' onClick={toggleEditRecord}>
      <div className='rounded-md absolute opacity-0 h-full w-full bg-violet-200 group-hover:opacity-90 transition-all flex items-center justify-center'>
        <div className='p-2.5 rounded-full bg-violet-400 bg-opacity-50'>
          <PencilAltIcon className='h-7 w-7 text-violet-700' />
        </div>
      </div>
      <div className='grid grid-cols-5'>
        <div className='col-span-1 flex items-center justify-center'>
          <CategoryIcon category={record.category} />
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


const compareDate = (date1: string, compare: 'isBefore' | 'isAfter', date2: string) => {
  const date1Time = new Date(date1).getTime();
  const date2Time = new Date(date2).getTime();
  if (compare === 'isBefore') return date1Time <= date2Time;
  return date1Time >= date2Time;
};

const RecordsContent = () => {
  const [selectedRecord, setSelectedRecord] = React.useState<Record | null>(null);
  const { data } = useData();
  const { searchValue, startDateValue, endDateValue } = useSearch();
  
  const getFilteredRecords = () => {
    let filteredRecords = data.records.slice();

    if (searchValue && searchValue !== '')
    filteredRecords = filteredRecords.filter(record => record.name.toLowerCase().includes(searchValue.toLowerCase()));
    
    if (startDateValue && startDateValue !== '')
      filteredRecords = filteredRecords.filter(record => record.date && compareDate(record.date, 'isAfter', startDateValue));

    if (endDateValue && endDateValue !== '')
      filteredRecords = filteredRecords.filter(record => record.date && compareDate(record.date, 'isBefore', endDateValue));
    
    return filteredRecords;
  };

  const getContent = () => {
    if (data.budgets.length === 0) {
      return (
        <div className='flex items-center justify-center p-5 text-lg'>
          No budgets created yet!
        </div>
      );
    }
    if (getFilteredRecords().length === 0) {
      return (
        <div className='flex items-center justify-center p-5 text-lg'>
          No budgets found!
        </div>
      );
    }
    return getFilteredRecords().map(record => <RecordItem key={record.id} record={record} setSelected={() => setSelectedRecord(record)} />);
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
      <EditRecordModal record={selectedRecord} />
    </>
  );
};

export const Records = () => {
  return (
    <SearchProvider>
      <RecordsContent />
    </SearchProvider>
  );
};