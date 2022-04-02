import React from 'react';

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  description?: string;
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'className' | 'children'>;

export const FieldWrapper = ({ label, className, children }: FieldWrapperProps) => {
  return (
    <div>
      <label className={`block text-sm font-medium text-gray-700 ${className}`}>
        {label}
        <div className="mt-1">{children}</div>
      </label>
    </div>
  );
};