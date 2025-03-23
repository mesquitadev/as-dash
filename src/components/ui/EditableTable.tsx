import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

const EditableTable = ({ data, columns }: { data: any[]; columns: ColumnDef<any>[] }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

  return (
    <div className='p-2 w-full bg-white border-black shadow-lg rounded-lg overflow-hidden'>
      <div className='h-2' />
      <div>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    {header.isPlaceholder ? null : (
                      <>{flexRender(header.column.columnDef.header, header.getContext())}</>
                    )}
                  </th>
                ))}
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
      <div className='h-2 border-gray-400' />
    </div>
  );
};

export default EditableTable;
