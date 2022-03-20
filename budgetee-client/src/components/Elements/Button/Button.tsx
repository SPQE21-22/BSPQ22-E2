import React from 'react';

const variants = {
  primary: 'bg-rose-500 text-white border-transparent hover:bg-rose-600',
  inverse: 'bg-transparent text-rose-500 border-rose-500 hover:bg-rose-500 hover:text-white',
}

const sizes = {
  xs: 'py-1.5 px-2 text-xs',
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg',
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export const Button = (
  {
    type = 'button',
    className = '',
    variant = 'primary',
    size = 'md',
    ...props
  } : ButtonProps
) => {
  return (
    <button
      type={type}
      className={`flex justify-center items-center border-2 disabled:opacity-70 disabled:cursor-not-allowed rounded-full shadow font-medium transition-colors focus:outline-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className='mx-2'>{props.children}</span>
    </button>
  );
};