import axios from 'axios';
import { IInventoryItem, IProduct } from '../types';
import { useCallback, useEffect, useState } from 'react';
import InventoryItem from '../components/InventoryItem';
import NewInventoryItem from '../components/NewInventoryItem';
import ErrorMessage from '../components/ErrorMessage';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [inventory, setInventory] = useState<IInventoryItem[]>([]);
  const [error, setError] = useState('');

  const loadProducts = useCallback(async () => {
    setError('');
    try {
      const response = await axios.get<IProduct[]>('/product/all');
      setProducts(response.data);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  const loadInventory = useCallback(async () => {
    setError('');
    try {
      const response = await axios.get<IInventoryItem[]>('/inventory');
      setInventory(response.data);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    loadInventory();
  }, [loadInventory]);

  return (
    <div className='p-4'>
      <ErrorMessage error={error} />
      <NewInventoryItem
        products={products}
        inventory={inventory}
        setInventory={setInventory}
        setError={setError}
      />
      <Link to='/products' className='text-blue-600 underline'>
        Add new product
      </Link>
      <h1 className='font-medium text-gray-800 mb-2 mt-4'>Inventory list:</h1>
      <div className='border border-gray-300 rounded-md p-2 gap-2 flex flex-col'>
        {!inventory.length ? (
          <div className='text-gray-500'>Inventory list is empty</div>
        ) : null}
        {inventory.map((item, idx) => (
          <InventoryItem
            key={idx}
            item={item}
            inventory={inventory}
            setInventory={setInventory}
            setError={setError}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
