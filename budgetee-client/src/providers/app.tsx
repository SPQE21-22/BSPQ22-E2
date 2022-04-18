import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from '../context/DataContext';
import { ModalProvider } from '../context/ModalContext';
import { UserProvider } from '../context/UserContext';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <DataProvider>
      <ModalProvider>
        <UserProvider>
          <Router>{children}</Router>
        </UserProvider>
      </ModalProvider>
    </DataProvider>
  );
};