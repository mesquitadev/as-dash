import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, ...props }) => {
  const baseClasses = 'py-2 px-4 rounded font-bold';
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
    ghost: 'bg-transparent hover:bg-gray-200 text-gray-700',
    outline: 'border border-gray-500 text-gray-700 hover:bg-gray-200',
  };

  return <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props} />;
};

export default Button;
