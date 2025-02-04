import { useContext, useEffect, useState } from 'react';
import {IProduct, RelatedProductsProps, ShopContextType} from '../types/types';
import { ShopContext } from '../context/ShopContext';
import { Title } from './Title';
import { ProductItem } from './ProductItem';

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ category,subCategory }) => {
  const { products } = useContext(ShopContext) as ShopContextType;
  const [related, setRelated] = useState<IProduct[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((product) => category === product.category);
      productsCopy = productsCopy.filter((product) => subCategory === product.subCategory);
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
              {related.map((item, index) => (
                  <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
              ))}
          </div>
    </div>
  );
};
