// @ts-nocheck
import { MeasureUnitSelect } from '@/components/ui/MeasureUnitySelect';
import { useGetMaterialQuery, useUpdateMaterialMutation } from '@/features/materialsApiSlice';
import { useLoading } from '@/hooks/useLoading';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

// Definindo o esquema de validação com yup
const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  quantity: yup
    .number()
    .required('Quantidade é obrigatória')
    .positive('Quantidade deve ser positiva'),
  materialCode: yup.string().required('Código do Material é obrigatório'),
  measureUnit: yup.string().required('Unidade de Medida é obrigatória'),
});

const EditarItem: React.FC<{
  open: boolean;
  onClose: () => void;
  id: number;
}> = ({ open, onClose, id }) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { setLoading } = useLoading();
  const [updateMaterial, { isLoading }] = useUpdateMaterialMutation();
  const { enqueueSnackbar } = useSnackbar();
  const { data: material, isLoading: isLoadingMaterial } = useGetMaterialQuery(id);

  const measureUnit = watch('measureUnit', 'UNITY');

  useEffect(() => {
    setLoading(isLoading || isLoadingMaterial);
  }, [isLoading, isLoadingMaterial, setLoading]);

  useEffect(() => {
    if (material) {
      setValue('name', material.name);
      setValue('quantity', material.quantity);
      setValue('materialCode', material.materialCode);
      setValue('measureUnit', material.measureUnit);
      setValue('stockId', material.stockId);
    }
  }, [material, setValue]);

  const onSubmit = async (formData: any) => {
    try {
      await updateMaterial({ id, ...formData }).unwrap();
      onClose();
      reset();
      enqueueSnackbar('Item atualizado com sucesso!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Falha ao atualizar o item!', { variant: 'error' });
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
                      Editar Item
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
                          {...register('name')}
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                        {errors.name && (
                          <p className='text-red-500 text-xs italic'>{errors.name.message}</p>
                        )}
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
                          {...register('quantity')}
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                        {errors.quantity && (
                          <p className='text-red-500 text-xs italic'>{errors.quantity.message}</p>
                        )}
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
                        {errors.materialCode && (
                          <p className='text-red-500 text-xs italic'>
                            {errors.materialCode.message}
                          </p>
                        )}
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
                        {errors.measureUnit && (
                          <p className='text-red-500 text-xs italic'>
                            {errors.measureUnit.message}
                          </p>
                        )}
                      </div>
                      <input type='hidden' {...register('stockId', { required: true })} />
                      <div className='flex items-center justify-between'>
                        <button
                          type='submit'
                          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        >
                          Atualizar Item
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

export default EditarItem;
