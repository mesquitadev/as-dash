import api from '@/services';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CriarAnotacao = () => {
  const { control, handleSubmit, register } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    await api.post('/diary', data);
    navigate('/minhas-anotacoes');
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Criar Anotação</h1>
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

export default CriarAnotacao;
