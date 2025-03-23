import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import React, { HTMLProps } from 'react';

function NewTable({
  data,
  columns,
}: {
  data: any[];
  columns: ColumnDef<any>[];
  onSelectRows?: (rows: any[]) => void;
}) {
  const table = useReactTable({
    data,
    columns,
    enableRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

  return (
    <div>
      <div className=''>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className='hover:bg-gray-100'>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className='px-6 py-4 whitespace-nowrap'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className='flex items-center gap-2'>
        <span className='flex items-center gap-1'>
          <div>Pagina</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </strong>
        </span>

        <button
          className='border rounded p-1 disabled:opacity-50'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </button>
        <button
          className='border rounded p-1 disabled:opacity-50'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próxima
        </button>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Exibir {pageSize} Itens por página
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function Filter({ column, table }: { column: Column<any, any>; table: Table<any> }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  return typeof firstValue === 'number' ? (
    <div className='flex space-x-2'>
      <input
        type='number'
        value={((column.getFilterValue() as any)?.[0] ?? '') as string}
        onChange={(e) => column.setFilterValue((old: any) => [e.target.value, old?.[1]])}
        placeholder={`Min`}
        className='w-24 border shadow rounded'
      />
      <input
        type='number'
        value={((column.getFilterValue() as any)?.[1] ?? '') as string}
        onChange={(e) => column.setFilterValue((old: any) => [old?.[0], e.target.value])}
        placeholder={`Max`}
        className='w-24 border shadow rounded'
      />
    </div>
  ) : (
    <input
      type='text'
      value={(column.getFilterValue() ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className='w-36 border shadow rounded'
    />
  );
}

export function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return <input type='checkbox' ref={ref} className={className + ' cursor-pointer'} {...rest} />;
}

export default NewTable;
