import { instance } from '../api/axios.api';
import { IGetOrdersResponse, IUpdateStatusResponse } from '../types/types';

export const OrderService = {
   async getOrders(token: string): Promise<IGetOrdersResponse> {
    const { data } = await instance.get<IGetOrdersResponse>(`api/order/list`, {
      headers: {
        'token': token
      }
    });
    return data;
  },

  async updateStatus(orderId: string, status: string, token: string): Promise<IUpdateStatusResponse> {
    const { data } = await instance.post<IUpdateStatusResponse>('api/order/status', {orderId, status}, {
      headers: {
        'Content-Type': 'application/json',
        'token' : token
      },
    });
    return data;
  },
};
