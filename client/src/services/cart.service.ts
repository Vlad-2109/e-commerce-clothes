import { instance } from '../api/axios.api';
import { IAddItemData, IGetCartDataResponse, IItemDataResponse, IUpdateItemData } from '../types/types';

export const CartService = {
  async addToCart(itemData: IAddItemData, token: string): Promise<IItemDataResponse> {
    const { data } = await instance.post<IItemDataResponse>('api/cart/add', itemData, {
      headers: {
        'Content-Type': 'application/json',
        'token' : token
      },
    });
    return data;
  },

  async updateCart(itemData: IUpdateItemData, token: string): Promise<IItemDataResponse> {
    const { data } = await instance.post<IItemDataResponse>(`api/cart/update`, itemData, {
      headers: {
        'Content-Type': 'application/json',
        'token' : token
      },
    });
    return data;
  },

  async getCart(token: string): Promise<IGetCartDataResponse> {
    const { data } = await instance.get<IGetCartDataResponse>(`api/cart/get`, {
      headers: {
        'token': token
      }
    });
    return data;
  },
};
