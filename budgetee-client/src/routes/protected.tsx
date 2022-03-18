import { Navigate, Outlet } from 'react-router';

import { MainLayout } from '../components/Layout';
import { Dashboard } from '../features/dashboard';
import { Budgets } from '../features/budgets';
import { Records } from '../features/records';
import { Analytics } from '../features/analytics';

const App = () => {
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