export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginDataResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface AdminContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}
