import { useRoutes } from 'react-router-dom';

import { publicRoutes } from './public';
import { protectedRoutes } from './protected';

export const AppRoutes = () => {
  const routes = true ? publicRoutes : protectedRoutes; // TODO show routes depending on user logged status

  const element = useRoutes([...routes]);

  return <>{element}</>
}