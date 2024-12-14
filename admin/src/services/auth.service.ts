import { instance } from '../api/axios.api';
import { ILoginData, ILoginDataResponse } from '../types/types';

export const AuthService = {
  async login(loginData: ILoginData): Promise<ILoginDataResponse> {
    const { data } = await instance.post<ILoginDataResponse>('api/user/admin', loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  },
};
