import React from 'react';

import { Button } from '../../../components/Elements/Button';
import { InputField } from '../../../components/Form';
import { ModalBase } from '../../../components/Overlay/ModalBase';

import { ActionType, useModals } from '../../../context/ModalContext';


type LoginFormData = {
  username: string;
  password: string;
};


export const LoginModal = () => {
  const [formState, setFormState] = React.useState<LoginFormData>({
    username: '',
    password: ''
  });
  const { modalState, dispatch } = useModals();

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
    // TODO
  }

  return (
    <ModalBase isOpen={modalState.loginOpen} closeModal={closeModal} title="Log in">
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
        <Button type='submit' variant='inverse' className='mt-2'>Log in</Button>
      </form>
    </ModalBase>
  );
};