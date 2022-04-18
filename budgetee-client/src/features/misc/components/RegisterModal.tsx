import React from 'react';

import { Button } from '../../../components/Elements/Button';
import { InputField } from '../../../components/Form';
import { ModalBase } from '../../../components/Overlay/ModalBase';

import { ActionType, useModals } from '../../../context/ModalContext';


type RegisterFormData = {
  username: string;
  password: string;
  name: string;
  email: string;
  birthDate: string;
};


export const RegisterModal = () => {
  const [formState, setFormState] = React.useState<RegisterFormData>({
    username: '',
    password: '',
    name: '',
    email: '',
    birthDate: '',
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
    <ModalBase isOpen={modalState.registerOpen} closeModal={closeModal} title="Register">
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
        <hr className="my-4"/>
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
    </ModalBase>
  );
};