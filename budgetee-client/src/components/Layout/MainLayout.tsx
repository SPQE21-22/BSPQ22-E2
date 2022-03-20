import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  ClipboardListIcon,
  CurrencyEuroIcon,
  HomeIcon, // or TemplateIcon, TableIcon
  TrendingUpIcon, // or ChartBarIcon, ChartPieIcon, ChartSquareBarIcon, DocumentReportIcon
} from '@heroicons/react/outline';

import { MobileCreateMenu, NewMenu, NotificationMenu, UserMenu } from './Menus';

type NavigationItem = {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;  // TODO wtf is this
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
              className={isActive => "group flex flex-col items-center text-xs font-light w-full hover:text-rose-600" + (isActive.isActive ? ' text-rose-600' : ' text-gray-400')}
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
    <div className='w-screen sm:hidden absolute bottom-0 h-14 shadow bg-gray-50 flex items-center justify-around'>
      <MobileNavigation />
    </div>
  );
};

const Logo = () => {
  return (
    <Link to='./dashboard' className='mr-2'>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png"
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
          className={isActive => "flex items-center justify-center mx-2 md:mx-3 hover:text-rose-600" + (isActive.isActive ? ' text-rose-500 font-medium' : ' text-gray-400')}
        >
          <item.icon
            className="h-6 w-6 mr-2 hidden lg:block"
            aria-hidden="true"
          />
          {item.name}
        </NavLink>
      ))}
    </>
  );
};

const Topbar = () => {
  return (
    <div className='absolute top-0 w-screen h-16 bg-white shadow flex justify-center'>
      <div className='max-w-7xl h-full w-full px-3 flex items-center justify-between'>
        <div className='flex items-center'>
          <Logo />
          <div className='hidden sm:flex items-center'>
            <TopNavigation />
          </div>
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
    <div className='h-screen pt-16 pb-14 sm:pb-0 flex overflow-hidden bg-gray-200'>
      <MobileBottombar />
      <Topbar />
      <main className='flex-1 relative overflow-y-auto focus:outline-none max-w-7xl mx-auto px-4 py-2 sm:px-6 md:px-8'>
        {children}
      </main>
    </div>
  );
}