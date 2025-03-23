import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Dialog open={open} onClose={onClose} className='relative z-30'>
      <DialogBackdrop className='fixed inset-0 bg-gray-500/75' />
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel className='bg-white rounded-lg p-6'>
            <DialogTitle className='text-lg font-bold'>{title}</DialogTitle>
            <div className='mt-4'>{message}</div>
            <div className='mt-4 flex justify-end'>
              <button
                onClick={onClose}
                className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2'
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              >
                Confirmar
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;
