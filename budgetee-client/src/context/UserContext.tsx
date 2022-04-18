import React from 'react';
import { User } from '../types';

type ProviderProps = {
  children: React.ReactNode;
};

type ContextValue = {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = React.createContext<ContextValue>({} as ContextValue);

export const UserProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null);

  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used withing a UserProvider');
  }
  return context;
};