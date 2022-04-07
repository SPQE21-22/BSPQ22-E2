import React from 'react';
import { Navigate, Outlet } from 'react-router';

import { MainLayout } from '../components/Layout';
import { Dashboard } from '../features/dashboard';
import { Budgets } from '../features/budgets';
import { Records } from '../features/records';
import { Analytics } from '../features/analytics';

import { useData } from '../context/DataContext';
import { getBudgets } from '../api/getBudgets';
import { getRecords } from '../api/getRecords';

const App = () => {
  const { dispatch } = useData();
  
  // TODO implement React.Suspense for this
  React.useEffect(() => {
    const budgets = getBudgets();
    const records = getRecords();

    Promise.all([budgets, records])
      .then(result => {
        const [budgets, records] = result;
        dispatch({
          type: 'loadData',
          payload: {
            budgets: budgets,
            records: records
          }
        })
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: 'loadError',
          payload: {}
        })
      });
  }, [dispatch]);

  return (
    <MainLayout>
      {/* TODO what is outlet? */}
      <Outlet />
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/budgets', element: <Budgets /> },
      { path: '/records', element: <Records /> },
      { path: '/analytics', element: <Analytics /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];