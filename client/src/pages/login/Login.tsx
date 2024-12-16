import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from '../../context/ShopContext';
import { ShopContextType } from '../../types/types';
import { AuthService } from '../../services/auth.service';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const { token, setToken } = useContext(ShopContext) as ShopContextType;

  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [currentState, setCurrentState] = useState<string>('Sign Up');

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await AuthService.register({ name, email, password });
        if (response.success) {
          setToken(response.token!);
          localStorage.setItem('token', response.token!)
          toast.success('Successfully register');
        } else {
          toast.error(response.message);
        }
      } else {
        const response = await AuthService.login({ email, password });
        if (response.success) {
          setToken(response.token!);
          localStorage.setItem('token', response.token!);
          toast.success('Successfully login');
        } else {
          toast.error(response.message);
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  const onClickHandler = (state: string) => {
    setCurrentState(state);
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === 'Login' ? (
        ''
      ) : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === 'Login' ? (
          <>
            <p className="cursor-pointer">Forgot your password?</p>
            <p
              onClick={() => onClickHandler('Sign Up')}
              className="cursor-pointer"
            >
              Create account
            </p>
          </>
        ) : (
          <>
            <p className="cursor-pointer"></p>
            <p
              onClick={() => onClickHandler('Login')}
              className="cursor-pointer"
            >
              Login Here
            </p>
          </>
        )}
      </div>
      <button className="bg-black hover:bg-gray-900 text-white font-light px-8 py-2 mt-4">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};
