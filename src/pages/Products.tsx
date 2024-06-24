import axios, { AxiosError, isAxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.currentTarget);
    const formEntries = Array.from(formData.entries());
    const data = Object.fromEntries(formEntries);
    try {
      await axios.put('/product', data);
      navigate(-1);
    } catch (err) {
      const message = (err as Error).message;
      if (isAxiosError(err)) {
        const axiosMessage =
          ((err as AxiosError).response?.data as any)?.error ?? message;
        setError(
          typeof axiosMessage === 'string'
            ? axiosMessage
            : JSON.stringify(message)
        );
        return;
      }
      setError(message);
    }
  };

  return (
    <div className='p-4 border border-gray-300 rounded-md'>
      <ErrorMessage error={error} />
      <form className='flex flex-col items-center gap-4' onSubmit={onSubmit}>
        <h1 className='text-lg'>Add new product</h1>
        <input
          name='name'
          className='rounded border border-gray-300 px-1 flex-1 flex-basis-0 w-full max-w-[400px] py-1 text-center'
          placeholder='Enter product name'
        />
        <div className='flex justify-center gap-4'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-md text-white min-w-[100px]'
          >
            Add
          </button>
          <button
            className='bg-red-400 hover:bg-red-500 px-4 py-1 rounded-md text-white min-w-[100px]'
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Products;
