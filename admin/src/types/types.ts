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
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface IImages {
  image1: File | any;
  image2: File | any;
  image3: File | any;
  image4: File | any;
}
