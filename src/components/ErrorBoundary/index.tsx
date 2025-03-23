import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

const ErrorFallback: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <ExclamationCircleIcon className='w-16 h-16 text-red-500' />
      <h1 className='text-2xl font-bold text-gray-800 mt-4'>Algo deu errado</h1>
      <p className='text-gray-600 mt-2'>
        Desculpe, ocorreu um erro inesperado. Por favor, tente novamente mais tarde.
      </p>
    </div>
  );
};

export default ErrorFallback;
