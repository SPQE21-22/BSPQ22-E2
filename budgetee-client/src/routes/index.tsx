import { useRoutes } from 'react-router-dom';

import { publicRoutes } from './public';
import { protectedRoutes } from './protected';
import { useUser } from '../context/UserContext';
import { useUserRequired } from '../hooks/useUserRequired';
import { Spinner } from '../components/Elements/Spinner';

export const AppRoutes = () => {
  const { user } = useUser();
  const userLoaded = useUserRequired();

  const routes = user ? protectedRoutes : publicRoutes; // TODO show routes depending on user logged status

  const element = useRoutes(routes);

  if (!userLoaded) {
    // TODO add logo on top
    return (
      <div className='h-screen w-screen flex flex-col items-center justify-center'>
        <Spinner size='xl' />
        <h1 className='mt-10 text-3xl font-light'>Please wait...</h1>
      </div>
    );
  }

  return <>{element}</>
}