import React from 'react';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button = ({
  type = 'button',
  onClick,
  className = '',
  children,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`py-3 px-4 rounded-lg font-semibold transition w-full
         text-white hover:brightness-110
         dark:text-white
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
