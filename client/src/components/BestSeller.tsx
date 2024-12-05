import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { IProduct, ShopContextType } from '../types/types';
import { Title } from './Title';
import { ProductItem } from './ProductItem';

export const BestSeller: React.FC = () => {
  const { products } = useContext(ShopContext) as ShopContextType;

  const [bestSeller, setBestSeller] = useState<IProduct[]>([]);

  useEffect(() => {
    setBestSeller(products.filter((product) => product.bestseller).slice(0, 5));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
          numquam saepe neque dolore molestiae quibusdam, optio nobis natus
          placeat labore minima. Sequi odit incidunt tempore temporibus odio eum
          distinctio earum.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};
