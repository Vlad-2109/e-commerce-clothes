export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginDataResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface IProductDataResponse {
  success: boolean;
  message: string;
}

export interface AdminContextType {
  currency: string;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface IImages {
  image1: File | any;
  image2: File | any;
  image3: File | any;
  image4: File | any;
}

export interface IGetProducts {
  success: boolean;
  products?: IGetProduct[];
  message?: string;
}
export interface IGetProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  bestseller: boolean;
  date: Date;
  __v: number;
}

export interface IOrder {
  _id: string;
  userId: string;
  items: IOrderItem[];
  amount: number;
  address: IPlaceOrderData;
  status: string;
  paymentMethod: string;
  payment: boolean;
  date: number;
  __v: number;
}

export interface IOrderItem {
  bestseller: boolean;
  category: string;
  date: number;
  description: string;
  image: string[];
  name: string;
  price: number;
  quantity: number;
  size: string;
  sizes: string[];
  subCategory: string;
  __v: number;
  _id: string;
}

export interface IPlaceOrderData {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
}

export interface IGetOrdersResponse {
  success: boolean;
  orders?: IOrder[];
  message: string;
}

export interface IUpdateStatusResponse{
  success: string;
  message: string;
}