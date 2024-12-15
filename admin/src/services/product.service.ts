import { instance } from '../api/axios.api';
import { IProductDataResponse } from '../types/types';

export const ProductService = {
  async addProduct(productData: FormData, token: string): Promise<IProductDataResponse> {
    const { data } = await instance.post<IProductDataResponse>('api/product/add', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'token' : token
      },
    });
    return data;
  },
};
