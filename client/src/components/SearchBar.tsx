import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { ShopContextType } from '../types/types';
import { assets } from '../assets/frontend_assets/assets';

export const SearchBar: React.FC = () => {
    
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext) as ShopContextType;

  const location = useLocation();

  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClickHandler = () => {
    setShowSearch(false);
  };

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={onChangeHandler}
          type="text"
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <img src={assets.search_icon} alt="search-icon" className="w-4" />
      </div>
      <img
        src={assets.cross_icon}
        alt="cross-icon"
        className="inline w-3 cursor-pointer"
        onClick={onClickHandler}
      />
    </div>
  ) : null;
};
