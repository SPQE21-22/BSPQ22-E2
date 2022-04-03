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
        className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm ${className}`}
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
