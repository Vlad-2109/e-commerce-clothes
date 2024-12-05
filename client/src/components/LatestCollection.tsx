import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { IProduct, ShopContextType } from '../types/types';
import { Title } from './Title';
import { ProductItem } from './ProductItem';

export const LatestCollection: React.FC = () => {
  const { products } = useContext(ShopContext) as ShopContextType;

  const [latestProducts, setLatestProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
          voluptatem, quis ex tenetur suscipit magnam consequuntur voluptatum
          itaque quisquam reprehenderit sed recusandae maiores numquam ad at
          dolore est porro omnis.
        </p>
      </div>
      {/* Rendering Products*/}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};
