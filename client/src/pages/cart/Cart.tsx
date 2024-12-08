import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { ICartData, ShopContextType } from '../../types/types';
import { Title } from '../../components/Title';
import { assets } from '../../assets/frontend_assets/assets';

export const Cart: React.FC = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext) as ShopContextType;

  const [cartData, setCartData] = useState<ICartData[]>([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const onImageClickUpdateHandler = (itemId: string, size: string, quantity: number) => {
    updateQuantity(itemId, size, quantity);
  };

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>, itemId: string, itemSize: string) => {
    if (e.target.value === '' || e.target.value === '0') {
      return;
    } else {
      updateQuantity(itemId, itemSize, Number(e.target.value))
    }
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(product => product._id === item._id);
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  src={productData?.image[0]}
                  alt="product-image"
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="text-sm sm:text-lg font-medium">
                    {productData?.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData?.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                onChange={(e) => onChangeInputHandler(e, item._id, item.size)}
              />
              <img
                src={assets.bin_icon}
                alt="bin"
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                onClick={() =>
                  onImageClickUpdateHandler(item._id, item.size, 0)
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
