import React from 'react';

type ProviderProps = {
  children: React.ReactNode;
};

type RecordFilters = {
  search: string;
  budget: string;
  startDate: string;
  endDate: string;
};

type ContextValue = {
  filters: RecordFilters;
  filterHandler: (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => void;
  clearFilters: () => void;
};

const SearchContext = React.createContext<ContextValue>({} as ContextValue);

const defaultFilters: RecordFilters = {
  search: '',
  budget: '',
  startDate: '',
  endDate: '',
};

export const SearchProvider = ({ children }: ProviderProps) => {
  const [filters, setFilters] = React.useState<RecordFilters>(defaultFilters);

  const filterHandler = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    setFilters({
      ...filters,
      [name]: value
    });
  };

  const clearFilters = () => setFilters(defaultFilters);
  
  const value = {
    filters,
    filterHandler,
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