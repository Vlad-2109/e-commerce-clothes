import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Login } from './Login';
import { AdminContext } from '../context/AdminContext';
import { AdminContextType } from '../types/types';

export const Layout: React.FC = () => {

  const { token } = useContext(AdminContext) as AdminContextType;

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {token === '' ? (
        <Login/>
      ) : (
        <>
          <Navbar/>
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
