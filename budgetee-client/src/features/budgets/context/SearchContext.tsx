import React from 'react';

type ProviderProps = {
  children: React.ReactNode;
};

type ContextValue = {
  searchValue: string;
  startDateValue: string;
  endDateValue: string;
  handleSearchChange: (event: React.FormEvent<HTMLInputElement>) => void;
  handleStartDateChange: (event: React.FormEvent<HTMLInputElement>) => void;
  handleEndDateChange: (event: React.FormEvent<HTMLInputElement>) => void;
  clearFilters: () => void;
};

const SearchContext = React.createContext<ContextValue>({} as ContextValue);

export const SearchProvider = ({ children }: ProviderProps) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [startDateValue, setStartDateValue] = React.useState('');
  const [endDateValue, setEndDateValue] = React.useState('');

  const handleSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchValue(value);
  };

  const handleStartDateChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setStartDateValue(value);
  };

  const handleEndDateChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setEndDateValue(value);
  };

  const clearFilters = () => {
    setStartDateValue('');
    setEndDateValue('');
  };
  
  const value = {
    searchValue,
    startDateValue,
    endDateValue,
    handleSearchChange,
    handleStartDateChange,
    handleEndDateChange,
    clearFilters,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = React.useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a ModalProvider');
  }
  return context;
};