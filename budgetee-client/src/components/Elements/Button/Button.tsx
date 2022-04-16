import React from 'react';
import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-violet-500 text-white border-transparent hover:bg-violet-600 disabled:hover:bg-violet-500',
  inverse: 'bg-transparent text-violet-500 border-violet-500 hover:bg-violet-500 hover:text-white disabled:hover:bg-transparent disabled:hover:text-violet-500',
  primaryRed: 'bg-red-500 text-white border-transparent hover:bg-red-600 disabled:hover:bg-red-500',
  inverseRed: 'bg-transparent text-red-500 border-red-500 hover:bg-red-500 hover:text-white disabled:hover:bg-transparent disabled:hover:text-red-500',
  primaryBlack: 'bg-black text-white border-transparent hover:bg-slate-900 disabled:hover:bg-slate-800',
  inverseBlack: 'bg-transparent text-black border-black hover:bg-black hover:text-white disabled:hover:bg-transparent disabled:hover:text-black',
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
  asLink?: boolean;
  to?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'primary',
      size = 'md',
      asLink = false,
      to = '',
      ...props
    },
    ref
  ) => {
    if (asLink) return (
      <Link
        to={to}
        className={`flex justify-center items-center border-2 disabled:opacity-70 disabled:cursor-not-allowed rounded-lg shadow font-medium transition-colors focus:outline-none ${variants[variant]} ${sizes[size]} ${className}`}
      >
        <span className='mx-2 flex items-center justify-center'>{props.children}</span>
      </Link>
    );

    return (
      <button
        ref={ref}
        type={type}
        className={`flex justify-center items-center border-2 disabled:opacity-70 disabled:cursor-not-allowed rounded-lg shadow font-medium transition-colors focus:outline-none ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        <span className='mx-2 flex items-center justify-center'>{props.children}</span>
      </button>
    );
  }
);