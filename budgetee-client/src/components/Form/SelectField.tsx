import React from 'react';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & React.InputHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  className?: string;
};

// TODO use HeadlessUI
export const SelectField = (
  {
    label,
    name,
    options,
    className,
    defaultValue,
    placeholder,
    onChange
  }: SelectFieldProps) => {
  return (
    <FieldWrapper label={label}>
      <select
        placeholder={placeholder}
        name={name}
        className={`appearance-none block w-full px-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm ${className}`}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map(({ label, value}) => (
          <option key={label?.toString()} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};
