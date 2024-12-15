import { createContext, useState } from 'react';
import { AdminContextType } from '../types/types';

export const AdminContext = createContext<AdminContextType | null>(null);

const AdminContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {

  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');

  const currency: string = '$';

  const value = { currency, token, setToken };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
