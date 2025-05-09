import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface Item {
  id: number;
  name: string;
  quantity: number;
  materialCode: string;
  measureUnit: string;
}
const DeletarItem: React.FC<{
  open: boolean;
  onClose: () => void;
  handleDeleteItem: () => void;
  item: Item;
}> = ({ open, onClose, item, handleDeleteItem }) => {
  return (
    <Dialog as='div' open={open} onClose={onClose} className='relative z-30'>
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
                    Excluir Item
                  </DialogTitle>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>Deseja excluir o item {item?.name}?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
              <button
                type='button'
                onClick={handleDeleteItem}
                className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
              >
                Sim
              </button>
              <button
                type='button'
                onClick={onClose}
                className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
              >
                Não
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeletarItem;
