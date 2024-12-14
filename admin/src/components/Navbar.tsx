import { assets } from '../assets/admin_assets/assets';

export const Navbar: React.FC = () => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img src={assets.logo} alt="logo" className="w-[max(10%,80px)]" />
      <button className="bg-gray-600 hover:bg-gray-500 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">
        Logout
      </button>
    </div>
  );
};
