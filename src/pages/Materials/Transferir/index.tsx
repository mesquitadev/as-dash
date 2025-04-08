// @ts-nocheck
import EditableTable from '@/components/ui/EditableTable';
import OptionMenu from '@/components/ui/OptionMenu';
import { useGetStockByIdQuery, useGetStocksQuery } from '@/features/stockApiSlice';
import { useTransferMaterialMutation } from '@/features/transferMaterialsApiSlice';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { ColumnDef } from '@tanstack/react-table';
import { enqueueSnackbar } from 'notistack';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface SelectedItem {
  stockId: number;
  name: string;
  materialCode: string;
}

interface TransferirItemProps {
  open: boolean;
  onClose: () => void;
  selectedItems: SelectedItem[];
  sourceStockId: number;
}

interface TransferItemPayload {
  materialCode: string;
  quantity: number;
}

interface TransferPayload {
  items: TransferItemPayload[];
  fromStockId: number;
  toStockId: number;
}

// Definindo o esquema de validação com yup
const schema = yup.object().shape({
  targetStockId: yup.number().required('Estoque de destino é obrigatório'),
  items: yup
    .array()
    .of(
      yup.object().shape({
        materialCode: yup.string().required(),
        quantity: yup.number().required().positive().integer(),
      }),
    )
    .min(1, 'Pelo menos um item deve ser selecionado para transferência'),
});

const TransferirItem = ({ open, onClose, selectedItems, sourceStockId }: TransferirItemProps) => {
  const [transferItems] = useTransferMaterialMutation();
  const { data: stocks } = useGetStocksQuery({});
  const { data: sourceStock } = useGetStockByIdQuery(sourceStockId);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<{
    targetStockId: number | null;
    items: { materialCode: string; quantity: number }[];
  }>({
    resolver: yupResolver(schema),
    defaultValues: {
      targetStockId: null,
      items: selectedItems.map((item) => ({ materialCode: item.materialCode, quantity: 0 })),
    },
  });

  const items = watch('items');

  const handleItemSelection = (materialCode: string, quantity: number) => {
    setValue(
      'items',
      items.map((item) => (item.materialCode === materialCode ? { ...item, quantity } : item)),
    );
  };

  const handleSelectStock = (stockId: number) => {
    if (Number(stockId) === sourceStockId) {
      enqueueSnackbar('O estoque de origem e destino não podem ser o mesmo.', {
        variant: 'warning',
      });
      return;
    }
    setValue('targetStockId', stockId);
  };

  const onSubmit = async (formData: any) => {
    const payload: TransferPayload = {
      items: formData.items,
      fromStockId: sourceStockId,
      toStockId: formData.targetStockId,
    };

    try {
      await transferItems(payload).unwrap();
      enqueueSnackbar('Itens transferidos com sucesso!', { variant: 'success' });
      onClose();
    } catch (error) {
      enqueueSnackbar(`Erro ao transferir itens: ${error?.data?.message}`, { variant: 'error' });
    }
  };

  const stockOptions =
    stocks?.content?.map((stock) => ({
      value: stock.id,
      label: stock.name,
    })) || [];

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Nome do Item',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'materialCode',
        header: 'Código do Material',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'quantity',
        header: 'Saldo Estoque',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Quantidade a Transferir',
        cell: (info) => (
          <Controller
            name={`items.${info.row.index}.quantity`}
            control={control}
            render={({ field }) => (
              <input
                type='number'
                min={0}
                {...field}
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            )}
          />
        ),
      },
    ],
    [control],
  );

  return (
    <Dialog open={open} onClose={onClose} className='relative z-30'>
      <DialogBackdrop className='fixed inset-0 bg-gray-500/75' />
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel className='bg-white rounded-lg p-6'>
            <DialogTitle className='text-lg font-bold'>Transferir Itens</DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-row justify-between space-x-1'>
                <div className='flex flex-col mt-4'>
                  <label htmlFor='sourceStockId' className='text-sm font-medium text-gray-700'>
                    Estoque de Origem
                  </label>
                  <div
                    id='sourceStockId'
                    className='flex items-center p-2 border rounded shadow w-full bg-gray-100 text-gray-500 cursor-not-allowed'
                  >
                    {sourceStock?.name || ''}
                  </div>
                </div>

                <div className='mt-4'>
                  <label
                    htmlFor='targetStockId'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Estoque de Destino
                  </label>
                  <Controller
                    name='targetStockId'
                    control={control}
                    render={({ field }) => (
                      <OptionMenu
                        options={stockOptions || []}
                        searchable
                        onChange={(value) => handleSelectStock(Number(value))}
                        value={field.value || ''}
                        noDefault
                      />
                    )}
                  />
                  {errors.targetStockId && (
                    <p className='text-red-500 text-xs italic'>{errors.targetStockId.message}</p>
                  )}
                </div>
              </div>
              <div className='mt-4'>
                <label
                  htmlFor='itemsToTransfer'
                  className='block text-sm font-medium text-gray-700'
                >
                  Itens a Transferir
                </label>
                <EditableTable
                  columns={columns}
                  data={selectedItems}
                  onItemSelection={handleItemSelection}
                />
                {errors.items && (
                  <p className='text-red-500 text-xs italic'>{errors.items.message}</p>
                )}
              </div>
              <div className='mt-4 flex justify-end'>
                <button
                  onClick={onClose}
                  className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2'
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                >
                  Transferir
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default TransferirItem;
