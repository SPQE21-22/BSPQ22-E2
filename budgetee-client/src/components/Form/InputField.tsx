import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'number' | 'email' | 'password';
  className?: string;
};

export const InputField = ({type = 'text', label, className }: InputFieldProps) => {
  return (
    <FieldWrapper label={label}>
      <input
        type={type}
        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
      />
    </FieldWrapper>
  );
};