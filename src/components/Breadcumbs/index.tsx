import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Breadcumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/inicio') {
    return (
      <nav className='bg-gray-100 p-3 rounded-md shadow w-auto' aria-label='Breadcrumb'>
        <ol className='inline-flex items-center space-x-1 md:space-x-3'>
          <li className='inline-flex items-center'>
            <Link to='/' className='text-gray-700 hover:text-gray-900 inline-flex items-center'>
              <HomeIcon className='w-4 h-4 mr-2' />
              Início
            </Link>
          </li>
        </ol>
      </nav>
    );
  }

  return (
    <nav className='flex bg-gray-100 p-3 rounded-md shadow w-auto' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-3'>
        <li className='inline-flex items-center'>
          <Link to='/' className='text-gray-700 hover:text-gray-900 inline-flex items-center'>
            <HomeIcon className='w-4 h-4 mr-2' />
            Início
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const displayValue = capitalize(value === 'editar' ? 'Editar' : value);

          // Remove the ID from the path if the next value is 'editar'
          const nextValue = pathnames[index + 1];
          if (value === 'editar') {
            return null;
          }
          if (nextValue === 'editar') {
            return (
              <li key={to} className='inline-flex items-center'>
                <ChevronRightIcon className='w-6 h-6 text-gray-400' />
                <Link
                  to={`/${pathnames.slice(0, index + 1).join('/')}/editar`}
                  className='text-gray-700 hover:text-gray-900 ml-1 md:ml-2'
                >
                  Editar
                </Link>
              </li>
            );
          }

          return (
            <li key={to} className='inline-flex items-center'>
              <ChevronRightIcon className='w-6 h-6 text-gray-400' />
              {isLast ? (
                <span className='text-gray-500 ml-1 md:ml-2'>{displayValue}</span>
              ) : (
                <Link to={to} className='text-gray-700 hover:text-gray-900 ml-1 md:ml-2'>
                  {displayValue}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcumbs;
