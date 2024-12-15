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
