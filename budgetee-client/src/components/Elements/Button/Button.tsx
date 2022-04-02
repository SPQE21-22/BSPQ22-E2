import React from 'react';

const variants = {
  primary: 'bg-violet-500 text-white border-transparent hover:bg-violet-600',
  inverse: 'bg-transparent text-violet-500 border-violet-500 hover:bg-violet-500 hover:text-white',
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

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'primary',
      size = 'md',
      ...props
    },
    ref
  ) => {
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