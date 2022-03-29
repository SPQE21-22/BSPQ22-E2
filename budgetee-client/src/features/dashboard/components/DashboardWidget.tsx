import React from 'react';

type DashboardWidgetProps = {
  title: string;
  children?: React.ReactNode; // TODO remove optionality
}

export const DashboardWidget = ({ title, children }: DashboardWidgetProps) => {
  return (
    <div className='px-2 bg-white shadow-sm shadow-slate-400 rounded w-full max-w-[400px] overflow-hidden h-32 divide-y divide-gray-200'>
      <h2 className='py-1 font-medium text-lg'>{title}</h2>
      <div className='p-2'>
        {children}
      </div>
    </div>
  );
};