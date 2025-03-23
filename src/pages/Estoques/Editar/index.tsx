import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import api from '@/services';
import { useNavigate, useParams } from 'react-router-dom';

const EditarAnotacao = () => {
  const { id } = useParams<{ id: string }>();
  const { control, handleSubmit, register, setValue } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnotation = async () => {
      const response = await api.get(`/diary/${id}`);
      setValue('title', response.data.title);
      setValue('content', response.data.content);
      setLoading(false);
    };
    fetchAnnotation();
  }, [id, setValue]);

  const onSubmit = async (data: any) => {
    await api.put(`/diary/${id}`, data);
    navigate('/minhas-anotacoes');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Editar Anotação</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='title'>
            Título
          </label>
          <input
            id='title'
            type='text'
            {...register('title', { required: true })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='content'>
            Conteúdo
          </label>
        </div>
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
  );
};

export default EditarAnotacao;
