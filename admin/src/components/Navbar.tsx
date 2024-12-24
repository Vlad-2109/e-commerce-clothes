import { useContext } from 'react';
import { assets } from '../assets/admin_assets/assets';
import { AdminContextType } from '../types/types';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {

  const navigate = useNavigate();

  const { setToken } = useContext(AdminContext) as AdminContextType;

  const onClickHandler = () => {
    setToken('');
    navigate('/');
  };

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img src={assets.logo} alt="logo" className="w-[max(10%,80px)]" />
      <button
        onClick={onClickHandler}
        className="bg-gray-600 hover:bg-gray-500 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};
