import { instance } from '../api/axios.api';
import { IGetProducts } from '../types/types';

export const ProductService = {
  async getProductsList(): Promise<IGetProducts> {
    const { data } = await instance.get<IGetProducts>(`api/product/list`);
    return data;
  },
};
