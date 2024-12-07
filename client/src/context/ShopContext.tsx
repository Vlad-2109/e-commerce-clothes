import { createContext, useState } from 'react';
import { products } from '../assets/frontend_assets/assets';
import { ShopContextType } from '../types/types';

export const ShopContext = createContext<ShopContextType | null>(null);

const ShopContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const currency = '$';
  const delivery_fee = 10;
  const [search, setSearch] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
