import { instance } from '../api/axios.api';
import {IGetUserOrdersResponse, IOrderData, IOrderDataResponse } from '../types/types';

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

  async getUserOrders(token: string): Promise<IGetUserOrdersResponse> {
    const { data } = await instance.get<IGetUserOrdersResponse>(`api/order/user-orders`, {
      headers: {
        'token': token
      }
    });
    return data;
  },

  // async updateCart(itemData: IUpdateItemData, token: string): Promise<IItemDataResponse> {
  //   const { data } = await instance.post<IItemDataResponse>(`api/cart/update`, itemData, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'token' : token
  //     },
  //   });
  //   return data;
  // },

  // async getCart(token: string): Promise<IGetCartDataResponse> {
  //   const { data } = await instance.get<IGetCartDataResponse>(`api/cart/get`, {
  //     headers: {
  //       'token': token
  //     }
  //   });
  //   return data;
  // },
};
