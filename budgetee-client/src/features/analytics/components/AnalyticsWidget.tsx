import React from 'react';

type AnalyticsWidgetProps = {
  title: string;
  linkText?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export const AnalyticsWidget = ({ title, className = '', containerClassName = '', children }: AnalyticsWidgetProps) => {
  return (
    <div className={`bg-white shadow shadow-slate-400 rounded-xl overflow-hidden h-96 flex flex-col items-stretch ${className}`}>
      {/* <h2 className='py-1.5 px-3 font-medium text-lg text-gray-900'>{title}</h2> */}
      <div className={`px-1 h-full`}>
        <div className={`relative mx-auto w-10/12 ${containerClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
};