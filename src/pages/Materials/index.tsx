import NewTable from '@/components/ui/NewTable';
import OptionMenu from '@/components/ui/OptionMenu';
import { useDeleteMaterialMutation, useGetMaterialsQuery } from '@/features/materialsApiSlice';
import { useGetUserStocksQuery } from '@/features/userStocksApiSlice';
import { useLoading } from '@/hooks/useLoading';
import { useOidc } from '@/oidc';
import { getMeasureUnit } from '@/utils';
import { MinusIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ColumnDef } from '@tanstack/react-table';
import Tippy from '@tippyjs/react';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useMemo, useState } from 'react';
import DeletarItem from './Deletar';
import EditarItem from './Editar';
import Lancar from './Lancar';
import TransferirItem from './Transferir';

const MaterialsPage: React.FC = () => {
  const [openLancarModal, setOpenLancarModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { setLoading } = useLoading();
  const { data: userStocks, isError: userStocksError } = useGetUserStocksQuery({});

  const { decodedIdToken } = useOidc();
  const [deleteItem] = useDeleteMaterialMutation(selectedItem?.id);
  const userRoles = useMemo(() => decodedIdToken?.groups || [], [decodedIdToken]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [openEditCompany, setOpenEditCompany] = useState(false);
  const [openTransferModal, setOpenTransferModal] = useState(false);

  const [selectedStockId, setSelectedStockId] = useState<string | null>(null);
  const [transferItems, setTransferItems] = useState<any[]>([]);

  const handleSelectStock = (stockId: string) => {
    setSelectedStockId(stockId);
    setTransferItems([]);
  };

  useEffect(() => {
    if (userStocks && userStocks.length > 0) {
      const defaultStock = userStocks.find((stock) => stock.isDefault) || userStocks[0];
      setSelectedStockId(defaultStock.value);
    }
  }, [userStocks]);

  const { data, isLoading, isError } = useGetMaterialsQuery(
    {
      stockId: selectedStockId,
    },
    {
      skip: !selectedStockId,
    },
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: () => <span className='flex w-100'>ID</span>,
        cell: (info) => info.getValue(),
        enableColumnFilter: false,
      },
      {
        accessorKey: 'name',
        cell: (info) => info.getValue(),
        header: 'Item',
      },
      {
        accessorKey: 'materialCode',
        cell: (info) => info.getValue(),
        header: 'Código',
      },
      {
        accessorKey: 'quantity',
        cell: (info) => {
          const unit = getMeasureUnit(info.row.original.measureUnit);
          return `${info.getValue()} ${unit}`;
        },
        header: 'Saldo Estoque',
        enableColumnFilter: false,
      },
      {
        accessorKey: 'actions',
        header: 'Ações',
        enableColumnFilter: false,
        cell: (info) => {
          const isItemAdded = transferItems.some((item) => item.id === info.row.original.id);
          return (
            <div className='flex justify-center'>
              {(userRoles.includes('/master') || userRoles.includes('/admin')) && (
                <>
                  <Tippy content='Editar Item'>
                    <button
                      onClick={() => {
                        setSelectedItemId(info.row.original.id);
                        setOpenEditCompany(true);
                      }}
                      className='text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center'
                    >
                      <PencilIcon className='h-5 w-5' />
                    </button>
                  </Tippy>

                  <Tippy content='Deletar Item'>
                    <button
                      onClick={() => {
                        setSelectedItem(info.row.original);
                        setOpenDeleteModal(true);
                      }}
                      className='text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center ml-4'
                    >
                      <TrashIcon className='h-5 w-5' />
                    </button>
                  </Tippy>
                </>
              )}
              {userRoles.includes('/master') ||
                (userRoles.includes('/admin') && (
                  <Tippy
                    content={
                      isItemAdded ? 'Remover item da Transferência' : 'Adicionar à Transferência'
                    }
                  >
                    <button
                      onClick={() => handleAddToTransfer(info.row.original)}
                      className={`text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center ml-4 ${
                        isItemAdded ? 'text-green-600' : 'text-red-600'
                      } hover:text-red-900`}
                    >
                      {isItemAdded ? (
                        <MinusIcon className='h-5 w-5' />
                      ) : (
                        <PlusIcon className='h-5 w-5' />
                      )}
                    </button>
                  </Tippy>
                ))}
            </div>
          );
        },
      },
    ],
    [userRoles, transferItems],
  );

  if (isError) {
    enqueueSnackbar('Erro ao carregar dados', { variant: 'error' });
  }

  if (userStocksError) {
    enqueueSnackbar('Erro ao carregar dados', { variant: 'error' });
  }

  const handleTransferItems = () => {
    if (transferItems.length === 0) {
      enqueueSnackbar('Favor, primeiro adicione os itens para a transferência', {
        variant: 'warning',
      });
    }
    setOpenTransferModal(true);
  };

  const handleOpenLancarModal = () => {
    setOpenLancarModal(true);
  };

  const handleAddToTransfer = (item: any) => {
    setTransferItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.filter((i) => i.id !== item.id);
      }
      return [...prevItems, item];
    });
  };

  const handleDeleteItem = async () => {
    try {
      await deleteItem(selectedItem.id).unwrap();
      setOpenDeleteModal(false);
      setSelectedItem(null);
      enqueueSnackbar('Item deletado com sucesso!', { variant: 'success' });
    } catch (error: any) {
      enqueueSnackbar(`Falha ao deletar o item!`, {
        variant: 'error',
      });
    }
  };

  const mappedStockOptions = userStocks?.map((stock) => ({
    value: stock.value,
    label: stock.label,
  }));
  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-row justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold mb-4'>Materiais</h1>
        <div>
          <button
            onClick={handleOpenLancarModal}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
          >
            Lançar Item
          </button>
          <button
            onClick={handleTransferItems}
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          >
            Transferir Itens
          </button>
        </div>
      </div>
      <div className='p-2 w-full bg-white border-black shadow-lg rounded-lg mb-2'>
        <div className='flex items-center justify-end w-full mb-2'>
          <OptionMenu
            searchable
            options={mappedStockOptions || []}
            onChange={handleSelectStock}
            value={selectedStockId || ''}
          />
        </div>
        <NewTable data={data?.content || []} columns={columns} />
      </div>

      {selectedItem && (
        <DeletarItem
          item={selectedItem}
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          handleDeleteItem={handleDeleteItem}
        />
      )}

      {selectedItemId && (
        <EditarItem
          id={selectedItemId}
          open={openEditCompany}
          onClose={() => setOpenEditCompany(false)}
        />
      )}
      <Lancar
        open={openLancarModal}
        onClose={() => setOpenLancarModal(false)}
        stockId={selectedStockId ? Number(selectedStockId) : 0}
      />
      {transferItems.length > 0 && (
        <TransferirItem
          sourceStockId={selectedStockId ? Number(selectedStockId) : 0}
          open={openTransferModal}
          onClose={() => setOpenTransferModal(false)}
          selectedItems={transferItems}
        />
      )}
    </div>
  );
};

export default MaterialsPage;
