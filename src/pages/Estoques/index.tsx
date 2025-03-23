import api from '@/services';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Menu } from '@headlessui/react';
import {
  EllipsisHorizontalIcon,
  ExclamationTriangleIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Estoques = () => {
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [annotationToDelete, setAnnotationToDelete] = useState<any>(null);

  const navigate = useNavigate();

  const handleGetAnnotations = useCallback(async () => {
    const response = await api.get('/diary');
    setAnnotations(response.data);
  }, []);

  const openDeleteDialog = (annotation: any) => {
    setAnnotationToDelete(annotation);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setAnnotationToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    if (annotationToDelete) {
      await api.delete(`/diary/${annotationToDelete.id}`);
      setAnnotations((prev) => prev.filter((a) => a.id !== annotationToDelete.id));
      closeDeleteDialog();
    }
  };

  useEffect(() => {
    handleGetAnnotations();
  }, [handleGetAnnotations]);

  const bgColors = ['bg-custom-start', 'bg-custom-primary'];

  return (
    <div className='container mx-auto'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Minhas Anotações</h1>
        <button
          onClick={() => navigate('/minhas-anotacoes/nova')}
          className='bg-custom-start hover:bg-custom-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Nova Anotação
        </button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {annotations?.map((annotation: any, index: number) => (
          <div
            key={annotation.id}
            className={`${
              bgColors[index % bgColors.length]
            } p-3 rounded-lg shadow-md min-h-[200px] flex flex-col justify-between relative`}
          >
            <div className='flex justify-end'>
              <Menu as='div' className='relative inline-block text-left w-full'>
                <div className=' flex flex-row justify-between w-full'>
                  <p className='text-md text-gray-50'>{annotation.title}</p>
                  <Menu.Button className='inline-flex justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm  hover:text-custom-start hover:bg-white'>
                    <EllipsisHorizontalIcon
                      aria-hidden='true'
                      className=' size-7 text-gray-400 justify-end'
                    />
                  </Menu.Button>
                </div>

                <Menu.Items
                  transition
                  className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
                >
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => navigate(`/minhas-anotacoes/editar/${annotation.id}`)}
                          className={`flex px-4 py-2 text-sm items-center ${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          }`}
                        >
                          <PencilSquareIcon
                            aria-hidden='true'
                            className='mr-2 size-7 text-gray-400 justify-end'
                          />{' '}
                          Editar
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => openDeleteDialog(annotation)}
                          className={`flex px-4 py-2 text-sm items-center ${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          }`}
                        >
                          <TrashIcon
                            aria-hidden='true'
                            className='mr-2 size-7 text-gray-400 justify-end'
                          />{' '}
                          Apagar Anotação
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
            </div>
            <div>
              <p className='text-sm text-gray-50'>{annotation.createdAt}</p>
              <p className='text-sm text-gray-50 text-wrap break-words line-clamp-4'>
                {annotation.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog} className='relative z-10'>
        <DialogBackdrop className='fixed inset-0 bg-gray-500/75' />
        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <DialogPanel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
              <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                    <ExclamationTriangleIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                  </div>
                  <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                    <DialogTitle
                      as='h3'
                      className='text-base font-semibold leading-6 text-gray-900'
                    >
                      Delete Annotation
                    </DialogTitle>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        Are you sure you want to delete this annotation? This action cannot be
                        undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                <button
                  type='button'
                  onClick={handleDelete}
                  className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                >
                  Delete
                </button>
                <button
                  type='button'
                  onClick={closeDeleteDialog}
                  className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Estoques;
