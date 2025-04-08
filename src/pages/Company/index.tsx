import NewTable from '@/components/ui/NewTable';
import { useDeleteCompanyMutation, useGetCompaniesQuery } from '@/features/companiesApiSlice';
import { useLoading } from '@/hooks/useLoading';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ColumnDef } from '@tanstack/react-table';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import CriarEmpresa from './Criar';
import EditarAnotacao from './Editar';

const CompanyList: React.FC = () => {
  const [page] = useState(0);
  const [size] = useState(2);
  const [sort] = useState('id,asc');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedCompany] = useState<any>(null);
  const { setLoading } = useLoading();
  const { data, isLoading, isError } = useGetCompaniesQuery({ page, size, sort });
  const [deleteCompany] = useDeleteCompanyMutation();
  const [selectedCompanyId] = useState<string | null>(null);
  const [openEditCompany, setOpenEditCompany] = useState(false);

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
    ],
    [],
  );

  if (isError) {
    enqueueSnackbar('Erro ao carregar dados', { variant: 'error' });
  }

  const handleAddCompany = () => {
    setOpenCreateModal(true);
  };

  const handleDeleteCompany = async () => {
    if (selectedCompany) {
      try {
        await deleteCompany(selectedCompany.id).unwrap();
        setOpenDeleteModal(false);
      } catch (error) {
        enqueueSnackbar(`Falha ao atualizar a empresa! Erro: ${(error as any)?.data?.message}`, {
          variant: 'error',
        });
      }
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-row justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold mb-4'>Empresas Cadastradas</h1>
        <button
          onClick={handleAddCompany}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Cadastrar Empresa
        </button>
      </div>
      <NewTable data={data?.content || []} columns={columns} />

      <Dialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        className='relative z-30'
      >
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
        />

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <DialogPanel transition>
              <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10'>
                    <ExclamationTriangleIcon aria-hidden='true' className='size-6 text-red-600' />
                  </div>
                  <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                    <DialogTitle as='h3' className='text-base font-semibold text-gray-900'>
                      Excluir Empresa
                    </DialogTitle>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        Deseja excluir a empresa {selectedCompany?.name}?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                <button
                  type='button'
                  onClick={handleDeleteCompany}
                  className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                >
                  Sim
                </button>
                <button
                  type='button'
                  onClick={() => setOpenDeleteModal(false)}
                  className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                >
                  Não
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {selectedCompanyId && (
        <EditarAnotacao
          id={selectedCompanyId}
          open={openEditCompany}
          onClose={() => setOpenEditCompany(false)}
        />
      )}
      <CriarEmpresa open={openCreateModal} onClose={() => setOpenCreateModal(false)} />
    </div>
  );
};

export default CompanyList;
