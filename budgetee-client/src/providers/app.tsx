import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ModalProvider } from '../context/ModalContext';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ModalProvider>
      <Router>{children}</Router>
    </ModalProvider>
  );
};