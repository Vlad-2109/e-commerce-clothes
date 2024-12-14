import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useEffect, useState } from 'react';
import { Login } from './Login';

// export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const Layout: React.FC = () => {
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
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
