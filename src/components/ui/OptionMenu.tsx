import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

interface OptionMenuProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  value: string;
  searchable?: boolean;
  noDefault?: boolean;
}

const OptionMenu: React.FC<OptionMenuProps> = ({
  options = [],
  onChange,
  value,
  searchable = false,
  noDefault = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (options.length > 0 && !value && !noDefault) {
      onChange(options[0].value);
    }
  }, [options, onChange, value, noDefault]);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [searchTerm, options]);

  useEffect(() => {
    if (menuRef.current) {
      const maxLength = Math.max(...options.map((option) => option.label.length));
      menuRef.current.style.minWidth = `${maxLength}ch`;
    }
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    onChange(value);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className='relative' ref={menuRef}>
      <div
        role='button'
        tabIndex={0}
        className='p-2 border rounded shadow w-full cursor-pointer flex items-center justify-between'
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className='flex items-center w-full'>
          {options.find((option) => option.value === value)?.label || 'Selecione...'}
          {value && <FaCheck className='ml-2' />}
        </div>
        <span
          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <ChevronDownIcon className='w-5 h-5' />
        </span>
      </div>
      {isOpen && (
        <div className='absolute z-10 left-0 w-full bg-white border rounded shadow max-h-60 overflow-y-auto'>
          {searchable && (
            <div className='p-2'>
              <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Buscar...'
                className='w-full mb-2 p-2 border rounded'
                onFocus={() => setIsOpen(true)}
              />
            </div>
          )}
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              role='option'
              aria-selected={option.value === value}
              tabIndex={0}
              onClick={() => handleSelect(option.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleSelect(option.value);
                }
              }}
              className={`p-2 cursor-pointer hover:bg-gray-200 flex items-center justify-between ${
                option.value === value ? 'bg-gray-100' : ''
              }`}
            >
              {option.label}
              {option.value === value && <FaCheck />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OptionMenu;
