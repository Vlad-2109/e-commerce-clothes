import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { ProductItemProps, ShopContextType } from '../types/types';

export const ProductItem: React.FC<ProductItemProps> = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext) as ShopContextType;

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
        <div className="overflow-hidden">
            <img src={image[0]} alt="image" className='hover:scale-110 transition ease-in-out' />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  );
};