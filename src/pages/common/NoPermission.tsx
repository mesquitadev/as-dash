import React from 'react';

const NoPermission: React.FC = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold mb-4'>Acesso Negado</h1>
        <p className='text-lg'>Você não tem permissão para acessar esta página.</p>
      </div>
    </div>
  );
};

export default NoPermission;
