import React from "react";

import { Button } from "../../../components/Elements/Button";
import { LoginModal } from '../components/LoginModal';
import { RegisterModal } from '../components/RegisterModal';

import { ActionType, useModals } from "../../../context/ModalContext";


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