import React from 'react';

import { useUser } from '../context/UserContext';
import { getSelf } from '../features/auth/api/getSelf';


export const useUserRequired = (): boolean => {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const { user, setUser } = useUser();

  React.useEffect(() => {
    if (user === null) {
      getSelf()
        .then(result => {
          setUser(result.data);
          setLoaded(true);
        }).catch(err => {
          console.log(err);
          setLoaded(true);
        });
    }
  }, [user, setUser]);

  return loaded;
};