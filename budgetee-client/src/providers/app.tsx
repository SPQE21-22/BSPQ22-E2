import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from '../context/DataContext';
import { ModalProvider } from '../context/ModalContext';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <DataProvider>
      <ModalProvider>
        <Router>{children}</Router>
      </ModalProvider>
    </DataProvider>
  );
};