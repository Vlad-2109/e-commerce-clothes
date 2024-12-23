import { instance } from '../api/axios.api';
import {IGetUserOrdersResponse, IOrderData, IOrderDataResponse, IOrderStripeDataResponse, IVerifyStripeDataResponse } from '../types/types';

export const OrderService = {
  async placeOrder( orderData: IOrderData, token: string ): Promise<IOrderDataResponse> {
    const { data } = await instance.post<IOrderDataResponse>('api/order/place', orderData, {
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
    });
    return data;
  },

  async placeOrderStripe( orderData: IOrderData, token: string ): Promise<IOrderStripeDataResponse> {
    const { data } = await instance.post<IOrderStripeDataResponse>('api/order/stripe', orderData, {
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
    });
    return data;
  },

   async verifyStripe( orderId: string, success: string, token: string ): Promise<IVerifyStripeDataResponse> {
    const { data } = await instance.post<IVerifyStripeDataResponse>('api/order/verify-stripe', {orderId, success}, {
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
    });
    return data;
  },

  async getUserOrders(token: string): Promise<IGetUserOrdersResponse> {
    const { data } = await instance.get<IGetUserOrdersResponse>(`api/order/user-orders`, {
      headers: {
        'token': token
      }
    });
    return data;
  },
};
