import { useContext, useState } from 'react';
import { AdminContextType, ILoginData} from '../types/types';
import { AuthService } from '../services/auth.service';
import { toast } from 'react-toastify';
import { AdminContext } from '../context/AdminContext';

export const Login: React.FC = () => {

  const { setToken } = useContext(AdminContext) as AdminContextType;

  const [loginData, setLoginData] = useState<ILoginData>({
    email: '',
    password: '',
  });

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await AuthService.login(loginData);
      if (response.success) {
          setToken(response.token!);
          toast.success('Successfully logged in');
      } else {
        toast.error(response.message);
      }
    } catch (error: any ) {
        console.error(error);
        toast.error(error.message)
    }
  };

  const onChangeHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={onChangeHanlder}
              value={loginData.email}
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={onChangeHanlder}
              value={loginData.password}
              name="password"
              type="password"
              placeholder="Enter your passwords"
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              required
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-slate-900"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
