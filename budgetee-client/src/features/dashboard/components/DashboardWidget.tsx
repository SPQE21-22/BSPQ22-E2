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
    <div className='relative bg-white shadow shadow-slate-400 col-span-1 rounded-md w-full overflow-hidden h-96'>
      <h2 className='py-1.5 px-3 font-medium text-lg'>{title}</h2>
      <div className='px-2'>
        {children}
      </div>
      {to && (
        <div className='w-full p-1 absolute bottom-0 flex items-center justify-center bg-white'>
          <Link to={to} className='w-11/12 rounded-full'>
            <Button className='w-full'>{linkText}</Button>
          </Link>
        </div>
      )}
    </div>
  );
};