import { MeasureUnitSelect } from '@/components/ui/MeasureUnitySelect';
import { useCreateMaterialMutation } from '@/features/materialsApiSlice';
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
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const LancarAnotacao: React.FC<{ open: boolean; onClose: () => void; stockId: number }> = ({
  open,
  onClose,
  stockId,
}) => {
  const { handleSubmit, register, reset, setValue, watch } = useForm();
  const { setLoading } = useLoading();
  const [createMaterial, { isLoading }] = useCreateMaterialMutation();
  const { enqueueSnackbar } = useSnackbar();

  const measureUnit = watch('measureUnit', 'UNITY'); // Valor padrão 'UNITY'

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setValue('stockId', stockId);
  }, [stockId, setValue]);

  const onSubmit = async (formData: any) => {
    try {
      await createMaterial(formData).unwrap();
      onClose();
      reset();
      enqueueSnackbar('Item criado com sucesso!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Falha ao criar o item!', { variant: 'error' });
    }
  };

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
                      Criar Item
                    </DialogTitle>
                  </div>
                  <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='mb-4'>
                        <label
                          className='block text-gray-700 text-sm font-bold mb-2'
                          htmlFor='name'
                        >
                          Nome
                        </label>
                        <input
                          id='name'
                          type='text'
                          {...register('name', { required: 'Name is required' })}
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                      </div>
                      <div className='mb-4'>
                        <label
                          className='block text-gray-700 text-sm font-bold mb-2'
                          htmlFor='quantity'
                        >
                          Quantidade
                        </label>
                        <input
                          id='quantity'
                          type='number'
                          {...register('quantity', { required: 'Quantity is required' })}
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                      </div>
                      <div className='mb-4'>
                        <label
                          className='block text-gray-700 text-sm font-bold mb-2'
                          htmlFor='materialCode'
                        >
                          Código do Material
                        </label>
                        <input
                          id='materialCode'
                          type='text'
                          {...register('materialCode')}
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                      </div>

                      <div className='mb-4'>
                        <label
                          className='block text-gray-700 text-sm font-bold mb-2'
                          htmlFor='measureUnit'
                        >
                          Unidade de Medida
                        </label>
                        <MeasureUnitSelect
                          value={measureUnit}
                          onChange={(value) => setValue('measureUnit', value)}
                        />
                      </div>
                      <input type='hidden' {...register('stockId', { required: true })} />
                      <div className='flex items-center justify-between'>
                        <button
                          type='submit'
                          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
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

export default LancarAnotacao;
