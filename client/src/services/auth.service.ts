import { instance } from '../api/axios.api';
import { ILoginData, ILoginDataResponse, IRegisterData, IRegisterDataResponse } from '../types/types';

export const AuthService = {
  async register(registerData: IRegisterData): Promise<IRegisterDataResponse> {
    const { data } = await instance.post<IRegisterDataResponse>('api/user/register', registerData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  },

  async login(loginData: ILoginData): Promise<ILoginDataResponse> {
    const { data } = await instance.post<ILoginDataResponse>('api/user/login', loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  },
};
