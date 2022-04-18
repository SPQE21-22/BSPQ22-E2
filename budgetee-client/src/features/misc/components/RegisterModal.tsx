import { XIcon } from '@heroicons/react/solid';
import React from 'react';

import { Button } from '../../../components/Elements/Button';
import { Spinner } from '../../../components/Elements/Spinner';
import { InputField } from '../../../components/Form';
import { ModalBase } from '../../../components/Overlay/ModalBase';

import { ActionType, useModals } from '../../../context/ModalContext';
import { useUser } from '../../../context/UserContext';
import { RequestLoadStates } from '../../../types';
import { register } from '../../auth/api/register';


type RegisterFormData = {
  username: string;
  password: string;
  name: string;
  email: string;
  birthDate: string;
};

type ErrorType = null | 409;


export const RegisterModal = () => {
  const [formState, setFormState] = React.useState<RegisterFormData>({
    username: '',
    password: '',
    name: '',
    email: '',
    birthDate: '',
  });
  const [loadState, setLoadState] = React.useState<RequestLoadStates>('unloaded');
  const [registerError, setRegisterError] = React.useState<ErrorType>(null);
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

    register(formState)
      .then(response => {
        setUser(response.data);
        closeModal();
      }).catch(error => {
        console.log(error);
        setLoadState('failure');
        if (error.response) {
          const code = error.response.status;

          if (code === 409) {
            setRegisterError(409);
            console.log('Wrong user/password combination'); // TODO notify
          }
        }
      });
  }

  const getContent = () => {
    switch (loadState) {
      case 'unloaded':
        return (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <InputField
              label='Username'
              name='username'
              value={formState.username}
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
            <hr className="my-4" />
            <InputField
              label='Name'
              name='name'
              value={formState.name}
              required
              onChange={handleInputChange}
              className='mb-4'
            />
            <InputField
              label='Email'
              type='email'
              name='email'
              value={formState.email}
              required
              onChange={handleInputChange}
              className='mb-4'
            />
            <InputField
              label='Birth date'
              type='date'
              name='birthDate'
              value={formState.birthDate}
              required
              onChange={handleInputChange}
              className='mb-4'
            />
            <Button type='submit' variant='inverse' className='mt-2'>Register</Button>
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
        if (registerError === 409) errorMessage = 'email is already in use';
        else errorMessage = 'unknown error';

        return (
          <>
            <div className='my-2 px-3 py-2 rounded-lg border-2 border-red-600 bg-red-400 flex items-center justify-center'>
              <span className='text-white font-bold'>Error: {errorMessage}. Please try again.</span>
              <XIcon className='ml-2 h-6 w-6 text-white hover:text-red-50 cursor-pointer' onClick={() => setLoadState('unloaded')} />
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <InputField
                label='Username'
                name='username'
                value={formState.username}
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
              <hr className="my-4" />
              <InputField
                label='Name'
                name='name'
                value={formState.name}
                required
                onChange={handleInputChange}
                className='mb-4'
              />
              <InputField
                label='Email'
                type='email'
                name='email'
                value={formState.email}
                required
                onChange={handleInputChange}
                className='mb-4'
              />
              <InputField
                label='Birth date'
                type='date'
                name='birthDate'
                value={formState.birthDate}
                required
                onChange={handleInputChange}
                className='mb-4'
              />
              <Button type='submit' variant='inverse' className='mt-2'>Register</Button>
            </form>
          </>
        );

    }
  };

  return (
    <ModalBase isOpen={modalState.registerOpen} closeModal={closeModal} title="Register">
      {getContent()}
    </ModalBase>
  );
};