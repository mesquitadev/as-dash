import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingBackdrop: React.FC = () => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='flex items-center justify-center space-x-2'>
        <FaSpinner className='w-8 h-8 text-white animate-spin' />
        <span className='text-white text-lg'>Carregando...</span>
      </div>
    </div>
  );
};

export default LoadingBackdrop;
