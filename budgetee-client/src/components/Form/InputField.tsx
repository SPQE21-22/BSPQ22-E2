import React from 'react';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  wrapperClassName?: string;
  children?: React.ReactNode;
};

export const InputField = (
  {
    id,
    type = 'text',
    label,
    name,
    value,
    required = false,
    onChange,
    className,
    wrapperClassName,
    children
  }: InputFieldProps) => {
  return (
    <FieldWrapper label={label} className={wrapperClassName}>
      <input
        id={id}
        type={type}
        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm ${className}`}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
      />
      {children}
    </FieldWrapper>
  );
};