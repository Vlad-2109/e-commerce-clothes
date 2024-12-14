export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginDataResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface ILoginProps {
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface INavbarProps {
  setToken: React.Dispatch<React.SetStateAction<string>>;
}
