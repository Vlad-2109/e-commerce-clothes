import { createContext, useEffect, useState } from 'react';
import { ICartItems, IGetProduct, ShopContextType } from '../types/types';
import { toast } from 'react-toastify';
import { ProductService } from '../services/product.service';

export const ShopContext = createContext<ShopContextType | null>(null);

const ShopContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const currency = '$';
  const delivery_fee = 10;
  const [search, setSearch] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ICartItems>({});
  const [products, setProducts] = useState<IGetProduct[]>([]);
  const [token, setToken] = useState<string>('');

  const addToCart = async (itemId: string, size: string) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId: string, size: string, quantity: number) => {
    
    const cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  }

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems){
      const itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]){
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo!.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await ProductService.getProductsList();
      if (response.success) {
        setProducts(response.products!);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);

    }
  }

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token')!);
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    token,
    setToken
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
