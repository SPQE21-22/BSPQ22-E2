import { useRoutes } from 'react-router-dom';

import { protectedRoutes } from './protected';

export const AppRoutes = () => {
  const routes = protectedRoutes; // TODO show routes depending on user logged status

  const element = useRoutes([...routes]);

  return <>{element}</>
}