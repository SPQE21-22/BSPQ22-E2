import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';

import { InputField } from '../../../components/Form';
import { useSearch } from '../context/SearchContext';
import { Button } from '../../../components/Elements/Button';
import { ActionType, useModals } from '../../../context/ModalContext';

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
      value={value}
      onChange={changeHandler}
      className='relative pl-11'
      wrapperClassName='relative'
    >
      <div className="absolute inset-y-0 left-3 flex items-center">
        <SearchIcon className='h-6 w-6 text-gray-600' />
      </div>
    </InputField>
  );
};

export const Sidebar = ({ className }: SidebarProps) => {
  const { searchValue, handleSearchChange } = useSearch();
  const { dispatch } = useModals();

  return (
    <div className={`max-h-32 h-full w-full lg:col-span-2 sm:rounded-lg p-3 shadow ${className}`}>
      <div className='flex items-center justify-between mb-3.5'>
        <h1 className='text-2xl font-medium'>Budgets</h1>
        <Button size='xs' onClick={() => dispatch(ActionType.SHOW_NEW_BUDGET)}>
          + New
        </Button>
      </div>
      <SearchBar value={searchValue} changeHandler={handleSearchChange} />
    </div>
  );
};