import axios, { AxiosError, isAxiosError } from 'axios';
import { IInventoryItem } from '../types';

interface InventoryItemProps {
  item: IInventoryItem;
  inventory: IInventoryItem[];
  setInventory: (inventory: IInventoryItem[]) => void;
  setError: (err: string) => void;
}

const InventoryItem = ({
  item,
  inventory,
  setInventory,
  setError,
}: InventoryItemProps) => {
  const onDelete = async () => {
    try {
      const response = await axios.post(
        '/inventory',
        inventory.filter((it) => it !== item)
      );
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
    <div className='flex items-center justify-between text-gray-800 overflow-hidden'>
      <span>{item.name}</span>
      <div className='items-center flex'>
        <span>{item.quantity}</span>
        <button
          className='bg-red-400 w-6 h-6 rounded-md text-white ml-2'
          onClick={onDelete}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default InventoryItem;
