import React from "react";

import { Button } from "../../../components/Elements/Button";
import { LoginModal } from '../components/LoginModal';
import { RegisterModal } from '../components/RegisterModal';

import { ActionType, useModals } from "../../../context/ModalContext";
import { ClipboardListIcon, CurrencyEuroIcon, TrendingUpIcon } from "@heroicons/react/solid";


type LandingFeatureItem = {
  title: string;
  content: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  color: string;
  background: string;
};

const landingFeatureItems = [
  {
    title: 'Create your budgets',
    content: 'Organize and divide your spendings in specific budgets',
    icon: ClipboardListIcon,
    color: 'text-rose-500',
    background: 'bg-rose-100'
  },
  {
    title: 'Add some records',
    content: 'Register records for each budget, and keep track of them over time',
    icon: CurrencyEuroIcon,
    color: 'text-teal-500',
    background: 'bg-teal-100'
  },
  {
    title: 'Analyze your spendings',
    content: 'Visualize various statistics about your habits in the form of graphs',
    icon: TrendingUpIcon,
    color: 'text-violet-500',
    background: 'bg-violet-100'
  }
] as LandingFeatureItem[];

export const Landing = () => {
  const { dispatch } = useModals();

  const openRegister = () => dispatch(ActionType.SHOW_REGISTER);
  const openLogin = () => dispatch(ActionType.SHOW_LOGIN);

  return (
    <>
      <div className='lg:min-h-screen lg:grid lg:grid-cols-11 overflow-hidden bg-white'>
        <div className='col-span-7 z-10 px-10 py-40 lg:py-0 flex flex-col items-center justify-center text-center h-full w-full'>
          <h1 className='text-5xl sm:text-6xl mb-8'>Welcome to Budgetee</h1>
          <p className='text-xl sm:text-2xl mb-6'>
            Organize and analyze your financial life from <u><i>anywhere</i></u>
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 w-5/6 sm:w-96'>
            <Button size='lg' className='w-full sm:w-6/12' variant='inverseBlack' onClick={openRegister}>Register</Button>
            <Button size='lg' className='w-full sm:w-6/12' variant='primaryBlack' onClick={openLogin}>Log in</Button>
          </div>
        </div>

        <div className='col-span-4 h-full w-full flex flex-col items-center justify-center gap-4 bg-violet-400 py-8'>
          {landingFeatureItems.map(item => (
            <div key={item.title} className='max-w-xs w-full flex flex-col items-start justify-center h-full max-h-56 p-6 rounded-lg shadow-lg bg-white hover:-translate-y-5 lg:hover:translate-x-5 lg:hover:translate-y-0 transition-transform'>
              <div className='flex'>
                <div className={`${item.background} rounded-full mb-6 p-4`}>
                  <item.icon className={`h-10 w-10 ${item.color}`} />
                </div>
              </div>
              <h2 className={`${item.color} font-bold text-xl mb-2`}>{item.title}</h2>
              <p className=''>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
      {/* TODO add curved + colored background */}
      <RegisterModal />
      <LoginModal />
    </>
  );
}