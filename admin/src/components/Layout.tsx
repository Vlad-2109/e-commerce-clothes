import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const Layout: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <hr />
      <div className="flex w-full">
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
};
