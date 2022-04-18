import React from 'react';

import { Button } from '../../../components/Elements/Button';
import { InputField } from '../../../components/Form';
import { ModalBase } from '../../../components/Overlay/ModalBase';

import { ActionType, useModals } from '../../../context/ModalContext';
import { useUser } from '../../../context/UserContext';
import { login } from '../../auth/api/login';
import { RequestLoadStates } from '../../../types';
import { Spinner } from '../../../components/Elements/Spinner';
import { XIcon } from '@heroicons/react/solid';


type LoginFormData = {
  email: string;
  password: string;
};

type ErrorType = null | 401 | 404;


export const LoginModal = () => {
  const [formState, setFormState] = React.useState<LoginFormData>({ email: '', password: '' });
  const [loadState, setLoadState] = React.useState<RequestLoadStates>('unloaded');
  const [loginError, setLoginError] = React.useState<ErrorType>(null);
  const { modalState, dispatch } = useModals();
  const { setUser } = useUser();

  const closeModal = () => dispatch(ActionType.CLOSE_ALL);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setLoadState('loading');

    // TODO handle submission states
    login(formState)
      .then(response => {
        setUser(response.data);
        closeModal();
      }).catch(error => {
        console.log(error);
        setLoadState('failure');
        if (error.response) {
          const code = error.response.status;

          if (code === 401) {
            setLoginError(401);
            console.log('Wrong user/password combination');
          } else if (code === 404) {
            setLoginError(404);
            console.log('Not registered');
          };
        }
      });
  }

  const getContent = () => {
    switch (loadState) {
      case 'unloaded':
        return (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <InputField
              label='Email'
              name='email'
              type='email'
              value={formState.email}
              required
              onChange={handleInputChange}
              className='mb-4'
            />
            <InputField
              label='Password'
              type='password'
              name='password'
              value={formState.password}
              required
              onChange={handleInputChange}
              className='mb-4'
            />
            <Button type='submit' variant='inverse' className='mt-2'>Log in</Button>
          </form>
        );
      case 'loading':
        return (
          <div className='px-16 py-20 flex flex-col items-center justify-center'>
            <Spinner size='lg' />
            <h2 className='text-lg mt-5'>Logging in...</h2>
          </div>
        );
      case 'failure':
        let errorMessage: string;
        if (loginError === 401) errorMessage = 'incorrect password';
        else if (loginError === 404) errorMessage = 'user not found';
        else errorMessage = 'unknown error';

        return (
          <>
            <div className='my-2 px-3 py-2 rounded-lg border-2 border-red-600 bg-red-400 flex items-center justify-center'>
              <span className='text-white font-bold'>Error: {errorMessage}. Please try again.</span>
              <XIcon className='ml-2 h-6 w-6 text-white hover:text-red-50 cursor-pointer' onClick={() => setLoadState('unloaded')} />
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <InputField
                label='Email'
                name='email'
                type='email'
                value={formState.email}
                required
                onChange={handleInputChange}
                className='mb-4'
              />
              <InputField
                label='Password'
                type='password'
                name='password'
                value={formState.password}
                required
                onChange={handleInputChange}
                className='mb-4'
              />
              <Button type='submit' variant='inverse' className='mt-2'>Log in</Button>
            </form>
          </>
        );

    }
  };

  return (
    <ModalBase isOpen={modalState.loginOpen} closeModal={closeModal} title="Log in">
      {getContent()}
    </ModalBase>
  );
};