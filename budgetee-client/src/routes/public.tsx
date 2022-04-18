import { Navigate, Outlet } from 'react-router';
import { Landing } from '../features/misc'

const App = () => {
  return (
    <Outlet />
  );
};

export const publicRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '*', element: <Navigate to="." /> },
    ]
  }
];