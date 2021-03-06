import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../../components/Elements/Button';

type DashboardWidgetProps = {
  title: string;
  to?: string;
  linkText?: string;
  children: React.ReactNode;
}

export const DashboardWidget = ({ title, to, linkText = 'See all', children }: DashboardWidgetProps) => {
  return (
    <div className='relative bg-violet-500 shadow shadow-slate-400 col-span-1 rounded-xl w-full overflow-hidden h-96 flex flex-col items-stretch'>
      <h2 className='py-1.5 px-3 font-medium text-lg text-gray-50'>{title}</h2>
      <div className={`px-1 h-full ${to && 'pb-16'}`}>
        {children}
      </div>
      {to && (
        <div className='w-full p-1 absolute bottom-0 flex items-center justify-center bg-slate-100 border-t border-slate-200'>
          <Link to={to} className='w-11/12 rounded-full'>
            <Button className='w-full my-2'>{linkText}</Button>
          </Link>
        </div>
      )}
    </div>
  );
};