import { instance } from '../api/axios.api';
import { IGetProducts, IProductDataResponse } from '../types/types';

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

  async getProductsList(): Promise<IGetProducts> {
    const { data } = await instance.get<IGetProducts>(`api/product/list`);
    return data;
  },

  async deleteProductById(id: string, token: string): Promise<IProductDataResponse> {
    const { data } = await instance.post<IProductDataResponse>(`api/product/remove`, { id }, {
      headers: {
        'Content-Type': 'application/json',
        'token' : token
      },
    });
    return data;
  },
};
