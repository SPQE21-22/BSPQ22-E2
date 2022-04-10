import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  ClipboardListIcon,
  CurrencyEuroIcon,
  HomeIcon, // or TemplateIcon, TableIcon
  TrendingUpIcon, // or ChartBarIcon, ChartPieIcon, ChartSquareBarIcon, DocumentReportIcon
} from '@heroicons/react/outline';

import logo from '../../assets/logo.png';
import { MobileCreateMenu, NewMenu, NotificationMenu, UserMenu } from './Menus';
import { CreateBudgetModal } from '../../features/common';
import { CreateRecordModal } from '../../features/common/components/CreateRecordModal';

type NavigationItem = {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

const navigation = [
  { name: 'Dashboard', to: './dashboard', icon: HomeIcon },
  { name: 'Budgets', to: './budgets', icon: ClipboardListIcon },
  { name: 'Records', to: './records', icon: CurrencyEuroIcon },
  { name: 'Analytics', to: './analytics', icon: TrendingUpIcon },
] as NavigationItem[];

const MobileNavigation = () => {
  const navigation = [
    { name: 'Dashboard', to: './dashboard', icon: HomeIcon },
    { name: 'Budgets', to: './budgets', icon: ClipboardListIcon },
    {},
    { name: 'Records', to: './records', icon: CurrencyEuroIcon },
    { name: 'Analytics', to: './analytics', icon: TrendingUpIcon },
  ] as NavigationItem[];

  return (
    <>
      {navigation.map((item, index) => {
        return index === 2 ?
          (
            <MobileCreateMenu key={index} />
          ) :
          (
            <NavLink
              end={index === 0}
              key={item.name}
              to={item.to}
              className={({ isActive }) => "border-2 border-transparent group flex flex-col items-center justify-center text-xs font-light h-full w-full hover:text-violet-600" + (isActive ? ' text-violet-500 font-medium border-b-violet-500' : ' text-gray-400')}
            >
              <item.icon
                className="h-6 w-6 transition-colors"
                aria-hidden="true"
              />
              <span className="transition-colors">{item.name}</span>
            </NavLink>
          )

      })}
    </>
  );
};

const MobileBottombar = () => {
  return (
    <nav className='w-screen sm:hidden fixed bottom-0 z-50 h-14 shadow bg-gray-50 flex items-center justify-around'>
      <MobileNavigation />
    </nav>
  );
};

const Logo = () => {
  return (
    <Link to='./dashboard' className='mr-2'>
      <img
        src={logo}
        alt="logo"
        className='h-10 w-10 m-1 md:m-2.5'
      />
    </Link>
  );
}

const TopNavigation = () => {
  return (
    <>
      {navigation.map((item, index) => (
        <NavLink
          end={index === 0}
          key={item.name}
          to={item.to}
          className={isActive => "border-2 border-transparent h-full flex items-center justify-center mx-1.5 md:mx-2 hover:text-violet-600" + (isActive.isActive ? ' text-violet-500 font-medium border-b-violet-500' : ' text-gray-400')}
        >
          <item.icon
            className="h-6 w-6 mr-2 hidden lg:block"
            aria-hidden="true"
          />
          <span className='transition-colors'>{item.name}</span>
        </NavLink>
      ))}
    </>
  );
};

const Topbar = () => {
  return (
    <div className='absolute top-0 w-screen h-16 bg-white shadow flex justify-center z-10'>
      <div className='max-w-7xl h-full w-full px-3 flex items-center justify-between'>
        <div className='flex items-center h-full'>
          <Logo />
          <nav className='hidden sm:flex items-center h-full'>
            <TopNavigation />
          </nav>
        </div>
        <div className='flex items-center gap-4'>
          <NewMenu />
          <NotificationMenu />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

type MainLayoutProps = {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='h-screen pt-16 pb-14 sm:pb-0 flex overflow-hidden bg-slate-200'>
      <CreateBudgetModal />
      <CreateRecordModal />
      <MobileBottombar />
      <Topbar />
      <main className='flex-1 relative overflow-y-auto focus:outline-none max-w-7xl mx-auto sm:px-6 sm:py-2 md:px-8'>
        {children}
      </main>
    </div>
  );
}