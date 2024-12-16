import { useContext, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/frontend_assets/assets';
import { ShopContext } from '../context/ShopContext';
import { ShopContextType } from '../types/types';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const [visible, setVisible] = useState<boolean>(false);

  const { setShowSearch, getCartCount, token, setToken, setCartItems } = useContext(ShopContext) as ShopContextType;

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  const onClickHandler = () => {
    setVisible((prevValue) => !prevValue);
  };

  const onClickImageHandler = () => {
    setShowSearch(true);
  }

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          alt="search-icon"
          className="w-5 cursor-pointer"
          onClick={onClickImageHandler}
        />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            alt="profile-icon"
            className="w-5 cursor-pointer"
            onClick={() => (token ? null : navigate('/login'))}
          />
          {/* Dropdown Menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdowm-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart-icon" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={onClickHandler}
          src={assets.menu_icon}
          alt="menu-icon"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={onClickHandler}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              alt="dropdown"
              className="h-4 rotate-180"
            />
            <p>Back</p>
          </div>
          <NavLink onClick={onClickHandler} className="py-2 pl-6 border" to="/">
            HOME
          </NavLink>
          <NavLink
            onClick={onClickHandler}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={onClickHandler}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={onClickHandler}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};
