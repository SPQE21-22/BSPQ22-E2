import React from 'react';

type ProviderProps = {
  children: React.ReactNode;
};

type ContextValue = {
  searchValue: string;
  handleSearchChange: (event: React.FormEvent<HTMLInputElement>) => void;
};

const SearchContext = React.createContext<ContextValue>({} as ContextValue);

export const SearchProvider = ({ children }: ProviderProps) => {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchValue(value);
  };
  
  const value = { searchValue, handleSearchChange };

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