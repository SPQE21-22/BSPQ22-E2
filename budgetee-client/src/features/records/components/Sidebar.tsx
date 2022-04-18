import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { ChevronUpIcon } from '@heroicons/react/outline';

import { InputField, SelectField } from '../../../components/Form';
import { useSearch } from '../context/SearchContext';
import { Button } from '../../../components/Elements/Button';
import { ActionType, useModals } from '../../../context/ModalContext';
import { Disclosure } from '@headlessui/react';
import { useData } from '../../../context/DataContext';

type SidebarProps = {
  className?: string;
}

type SearchBarProps = {
  value: string;
  changeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ value, changeHandler }: SearchBarProps) => {
  return (
    <InputField
      name='search'
      value={value}
      onChange={changeHandler}
      className='relative pl-11 mb-2'
      wrapperClassName='relative'
    >
      <div className="absolute inset-y-0 left-3 flex items-center">
        <SearchIcon className='h-6 w-6 text-gray-600' />
      </div>
    </InputField>
  );
};

const FilterDisclosure = () => {
  const { data } = useData();
  const {
    filters,
    filterHandler,
    clearFilters,
  } = useSearch();

  const budgets = [{
    label: 'No filter',
    value: ''
  }].concat(data.budgets.map(budget => ({
    label: budget.name,
    value: budget.id
  })));

  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`${open ? 'rounded-t-lg' : 'rounded-lg'
                } flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-violet-900 bg-violet-100 hover:bg-violet-50 focus:outline-none focus-visible:ring focus-visible:ring-violet-500 focus-visible:ring-opacity-75 transition-colors`}
            >
              <span>Advanced filters</span>
              <ChevronUpIcon
                className={`${open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-purple-500 transition-transform`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-3 py-2 text-sm text-gray-700 bg-violet-100 rounded-b-lg">
              <Button variant='inverse' size='sm' className='w-full mb-2' onClick={clearFilters}>
                Clear filters
              </Button>
              <SelectField 
                label='Budget'
                name='budget'
                options={budgets}
                value={filters.budget}
                onChange={filterHandler}
                className='mb-2'
              />
              <InputField
                label='From...'
                type='date'
                name='startDate'
                value={filters.startDate}
                required
                onChange={filterHandler}
                className='mb-4'
              />
              <InputField
                label='To...'
                type='date'
                name='endDate'
                value={filters.endDate}
                required
                onChange={filterHandler}
                className='mb-4'
              />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export const Sidebar = ({ className }: SidebarProps) => {
  const { filters, filterHandler } = useSearch();
  const { dispatch } = useModals();

  return (
    <div className={`w-full lg:col-span-2 sm:rounded-lg p-3 shadow ${className}`}>
      <div className='flex items-center justify-between mb-3.5'>
        <h1 className='text-2xl font-medium'>Records</h1>
        <Button size='xs' onClick={() => dispatch(ActionType.SHOW_NEW_RECORD)}>
          + New
        </Button>
      </div>
      <SearchBar value={filters.search} changeHandler={filterHandler} />
      <FilterDisclosure />
    </div>
  );
};