import { useCreateCompanyMutation } from '@/features/companiesApiSlice';
import { useLoading } from '@/hooks/useLoading';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';

const CriarEmpresa: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { handleSubmit, register, reset } = useForm();
  const { setLoading } = useLoading();
  const [createCompany, { isLoading }] = useCreateCompanyMutation();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (formData: any) => {
    try {
      await createCompany(formData).unwrap();
      onClose();
      reset();
      enqueueSnackbar('Empresa criada com sucesso!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Falha ao criar a empresa!', { variant: 'error' });
    }
  };

  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <Dialog as='div' open={open} className='relative z-20' onClose={onClose}>
      <TransitionChild
        as={React.Fragment}
        enter='ease-in-out duration-500'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in-out duration-500'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <DialogBackdrop className='fixed inset-0 bg-gray-500/75 transition-opacity' />
      </TransitionChild>

      <div className='fixed inset-0 overflow-hidden'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
            <TransitionChild
              as={React.Fragment}
              enter='transform transition ease-in-out duration-500 sm:duration-700'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transform transition ease-in-out duration-500 sm:duration-700'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              <DialogPanel className='pointer-events-auto relative w-screen max-w-md'>
                <TransitionChild
                  as={React.Fragment}
                  enter='ease-in-out duration-500'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-500'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4'>
                    <button
                      type='button'
                      onClick={onClose}
                      className='relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden'
                    >
                      <span className='absolute -inset-2.5' />
                      <span className='sr-only'>Close panel</span>
                      <XMarkIcon aria-hidden='true' className='size-6' />
                    </button>
                  </div>
                </TransitionChild>
                <div className='flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl'>
                  <div className='px-4 sm:px-6'>
                    <DialogTitle className='text-base font-semibold text-gray-900'>
                      Criar Empresa
                    </DialogTitle>
                  </div>
                  <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='mb-4'>
                        <label
                          className='block text-gray-700 text-sm font-bold mb-2'
                          htmlFor='title'
                        >
                          Nome
                        </label>
                        <input
                          id='title'
                          type='text'
                          {...register('name', { required: true })}
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                      </div>
                      <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                        <button
                          type='submit'
                          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                          onClick={handleSubmit(onSubmit)}
                        >
                          Salvar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CriarEmpresa;
