import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import React, { useMemo, useState } from 'react';

interface TableProps {
  columns: { Header: string; accessor: string }[];
  data: any[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
  };
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  actions?: { label: string; onClick: (row: any) => void; roles: string[] }[];
  userRoles: string[];
  onSortedDataChange?: (sortedData: any[]) => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  pageable,
  onPageChange,
  onPageSizeChange,
  actions = [],
  userRoles,
  onSortedDataChange,
}) => {
  const { pageNumber, pageSize, totalPages, totalElements } = pageable;
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const hasPermission = (requiredRoles: string[]): boolean => {
    return requiredRoles.some((role) => userRoles.includes(role));
  };

  const toggleRowSelection = (rowIndex: number) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = new Set(prevSelectedRows);
      if (newSelectedRows.has(rowIndex)) {
        newSelectedRows.delete(rowIndex);
      } else {
        newSelectedRows.add(rowIndex);
      }
      return newSelectedRows;
    });
  };

  const sortedData = useMemo(() => {
    const selected = data.filter((_, index) => selectedRows.has(index));
    const unselected = data.filter((_, index) => !selectedRows.has(index));
    const sorted = [...selected, ...unselected];
    if (onSortedDataChange) {
      onSortedDataChange(sorted);
    }
    return sorted;
  }, [data, selectedRows, onSortedDataChange]);

  return (
    <div className='bg-white shadow-md rounded p-2'>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white '>
          <thead className='bg-gray-200'>
            <tr>
              <th className='py-2 px-4 border-b border-gray-200 text-left text-gray-600'>
                Selecionar
              </th>
              {columns?.map((column) => (
                <th
                  key={column.accessor}
                  className='py-2 px-4 border-b border-gray-200 text-left text-gray-600'
                >
                  {column.Header}
                </th>
              ))}
              {actions.length > 0 && (
                <th className='py-2 px-4 border-b border-gray-200 text-left text-gray-600'>
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`even:bg-gray-50 ${selectedRows.has(rowIndex) ? 'bg-blue-100' : ''}`}
              >
                <td className='py-2 px-4 border-b border-gray-200 text-gray-800'>
                  <input
                    type='checkbox'
                    checked={selectedRows.has(rowIndex)}
                    onChange={() => toggleRowSelection(rowIndex)}
                  />
                </td>
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className='py-2 px-4 border-b border-gray-200 text-gray-800'
                  >
                    {row[column.accessor]}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className='py-2 px-4 border-b border-gray-200 text-gray-800'>
                    {actions
                      .filter((action) => hasPermission(action.roles))
                      .map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(row)}
                          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2'
                        >
                          {action.label}
                        </button>
                      ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
        <div className='flex flex-1 justify-between sm:hidden'>
          <button
            onClick={() => onPageChange(pageNumber - 1)}
            disabled={pageNumber === 0}
            className={` ${
              pageNumber === 0 ? '' : ''
            } relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
          >
            Anterior
          </button>
          <button
            onClick={() => onPageChange(pageNumber + 1)}
            disabled={pageNumber + 1 >= totalPages}
            className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
          >
            Próximo
          </button>
        </div>
        <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm text-gray-700'>
              Mostrando <span className='font-medium'>{pageNumber * pageSize + 1}</span> a{' '}
              <span className='font-medium'>
                {Math.min((pageNumber + 1) * pageSize, totalElements)}
              </span>{' '}
              de <span className='font-medium'>{totalElements}</span> resultados
            </p>
          </div>
          <div>
            <nav
              aria-label='Pagination'
              className='isolate inline-flex -space-x-px rounded-md shadow-xs'
            >
              <button
                onClick={() => onPageChange(pageNumber - 1)}
                disabled={pageNumber === 0}
                className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              >
                <span className='sr-only'>Anterior</span>
                <ChevronLeftIcon aria-hidden='true' className='h-5 w-5' />
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => onPageChange(index)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    index === pageNumber
                      ? 'z-10 bg-primary text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => onPageChange(pageNumber + 1)}
                disabled={pageNumber + 1 >= totalPages}
                className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              >
                <span className='sr-only'>Próximo</span>
                <ChevronRightIcon aria-hidden='true' className='h-5 w-5' />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
