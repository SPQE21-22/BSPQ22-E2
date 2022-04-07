import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';

import { InputField } from '../../../components/Form';
import { useSearch } from '../context/SearchContext';

type SidebarProps = {
  className?: string;
}

type SearchBarProps = {
  value: string;
  changeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ value, changeHandler }: SearchBarProps ) => {
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

  return (
    <div className={`max-h-32 h-full w-full lg:col-span-2 sm:rounded-lg p-3 shadow ${className}`}>
      <h1 className='text-2xl font-medium mb-3.5'>Budgets</h1>
      <SearchBar value={searchValue} changeHandler={handleSearchChange} />
    </div>
  );
};