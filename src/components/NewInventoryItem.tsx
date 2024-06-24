import { FormEvent, useMemo } from 'react';
import { IInventoryItem, IProduct } from '../types';
import ReactSelect from 'react-select';
import axios, { AxiosError, isAxiosError } from 'axios';

interface NewInventoryItemProps {
  products: IProduct[];
  inventory: IInventoryItem[];
  setInventory: (inventory: IInventoryItem[]) => void;
  setError: (err: string) => void;
}

const NewInventoryItem = ({
  products,
  inventory,
  setInventory,
  setError,
}: NewInventoryItemProps) => {
  const productOptions = useMemo(
    () => products.map((item) => ({ value: item.name, label: item.name })),
    [products]
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.currentTarget);
    const formEntries = Array.from(formData.entries());
    const data = Object.fromEntries(formEntries);
    try {
      const quantity = parseInt(data.quantity as string);
      if (quantity <= 0) {
        throw new Error('Quantity is less or equal 0');
      }
      const name = (data.name as string).trim();
      const response = await axios.post('/inventory', [
        ...inventory,
        { name, quantity },
      ]);
      setInventory(response.data);
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
    <div className='mb-4'>
      <form className='flex gap-2 flex-col sm:flex-row' onSubmit={onSubmit}>
        <ReactSelect
          options={productOptions}
          name='name'
          className='rounded-md flex-1 flex-basis-0 w-full'
          placeholder='Name'
        />
        <input
          type='number'
          name='quantity'
          className='rounded border border-gray-300 px-1 flex-1 flex-basis-0 max-w-[100px] py-1'
          placeholder='Quantity'
        />
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-md text-white max-w-[100px]'
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default NewInventoryItem;
