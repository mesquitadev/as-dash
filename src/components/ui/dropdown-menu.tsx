import * as React from 'react';

export const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className='relative inline-block text-left'>{children}</div>;
};

export const DropdownMenuTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export const DropdownMenuContent: React.FC<{ align?: string; children: React.ReactNode }> = ({
  align = 'start',
  children,
}) => {
  return (
    <div
      className={`absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
        align === 'end' ? 'right-0' : 'left-0'
      }`}
    >
      {children}
    </div>
  );
};

export const DropdownMenuCheckboxItem: React.FC<{
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  children: React.ReactNode;
}> = ({ checked, onCheckedChange, className, children }) => {
  return (
    <div
      className={`flex items-center px-4 py-2 cursor-pointer ${className}`}
      role='checkbox'
      aria-checked={checked}
      tabIndex={0}
      onClick={() => onCheckedChange(!checked)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onCheckedChange(!checked);
        }
      }}
    >
      <input
        type='checkbox'
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
      <span className='ml-2'>{children}</span>
    </div>
  );
};
