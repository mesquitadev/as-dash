import { useLoading } from '@/hooks/useLoading';
import { useOidc } from '@/oidc';

const Login = () => {
  const { login } = useOidc();
  const { isLoading } = useLoading();

  return (
    <div className='flex h-screen bg-white bg-cover bg-center bg-gradient-to-r from-gradient-gray-from to-gradient-gray-to'>
      <div className='w-full flex flex-col justify-center items-center p-8'>
        <div className=' relative w-full max-w-sm bg-white rounded-sm justify-center items-center mx-4'>
          <div
            className='absolute top-[-50px] mx-4 w-[90%] p-4 
          bg-primary text-white shadow-md rounded-lg z-10'
          >
            <div className='w-full px-10 text-center'>
              <p className='text-sm'>Seja Bem vindo ao</p>
              <h1 className='text-3xl font-bold'>MacrOS | Clubium </h1>
            </div>
          </div>

          <div className='mt-8 p-5 border- rounded-md text-start h-full justify-center items-center'>
            <div className='w-full max-w-sm py-20'>
              <div className='flex items-center justify-center w-full'>
                <button
                  className='bg-primary flex w-full justify-center flex-row hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  disabled={isLoading}
                  // @ts-ignore
                  onClick={() => login()}
                >
                  {isLoading ? (
                    <svg className='animate-spin h-5 w-full' viewBox='0 0 24 24'>
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path className='opacity-75' fill='currentColor'></path>
                    </svg>
                  ) : (
                    'Entrar'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
