import React from 'react';

const AccessDenied: React.FC = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>Acesso Bloqueado</h1>
        <p className='text-lg'>Você não tem permissão para acessar esta página.</p>
      </div>
    </div>
  );
};

export default AccessDenied;
