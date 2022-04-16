import React from "react";

import { Button } from "../../../components/Elements/Button";
import { InputField } from "../../../components/Form";
import { ModalBase } from "../../../components/Overlay/ModalBase";

import { ActionType, useModals } from "../../../context/ModalContext";


type RegisterFormData = {
  username: string;
  password: string;
  name: string;
  email: string;
  birthDate: string;
};

type LoginFormData = {
  username: string;
  password: string;
};


const RegisterModal = () => {
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

const LoginModal = () => {
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

export const Landing = () => {
  const { dispatch } = useModals();

  const openRegister = () => dispatch(ActionType.SHOW_REGISTER);
  const openLogin = () => dispatch(ActionType.SHOW_LOGIN);

  return (
    <>
      <div className='h-screen flex flex-col items-center justify-center overflow-hidden bg-white'>
        <div className='z-10 px-2 flex flex-col items-center justify-center text-center'>
          <h1 className='text-5xl sm:text-6xl mb-8'>Welcome to Budgetee</h1>
          <p className='text-xl sm:text-2xl mb-6'>
            Organize and analyze your financial life from <u><i>anywhere</i></u>
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 w-5/6 sm:w-96'>
            <Button size='lg' className='w-full sm:w-6/12' variant='inverseBlack' onClick={openRegister}>Register</Button>
            <Button size='lg' className='w-full sm:w-6/12' variant='primaryBlack' onClick={openLogin}>Log in</Button>
          </div>
        </div>
      </div>
      {/* TODO add curved + colored background */}
      <RegisterModal />
      <LoginModal />
    </>
  );
}