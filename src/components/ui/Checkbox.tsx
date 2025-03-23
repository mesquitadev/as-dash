import * as React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked'> {
  checked: boolean | 'indeterminate';
  onCheckedChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onCheckedChange, ...props }) => {
  return (
    <input
      type='checkbox'
      checked={checked === 'indeterminate' ? false : checked}
      ref={(el) => {
        if (el) el.indeterminate = checked === 'indeterminate';
      }}
      onChange={(e) => onCheckedChange(e.target.checked)}
      {...props}
    />
  );
};
