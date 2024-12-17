export interface ShopContextType {
  products: IProduct[];
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: ICartItems;
  setCartItems: React.Dispatch<React.SetStateAction<ICartItems>>;
  addToCart: (itemId: string, size: string) => void;
  getCartCount: () => number;
  updateQuantity: (itemId: string, size: string, quantity: number) => void;
  getCartAmount: () => number;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface ICartItems {
  [itemId: string]: {
    [size: string]: number;
  };
}

export interface ICartData {
  _id: string;
  size: string;
  quantity: number;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
}

export interface TitleProps {
  text1: string;
  text2: string;
}

export interface ProductItemProps {
  id: string;
  image: string[];
  name: string;
  price: number;
}

export interface RelatedProductsProps {
  category: string;
  subCategory: string;
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
  date: number;
  __v: number;
}

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterDataResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginDataResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface IAddItemData {
  itemId: string;
  size: string;
}

export interface IItemDataResponse {
  success: boolean;
  message: string;
}

export interface IUpdateItemData {
  itemId: string;
  size: string;
  quantity: number;
}

export interface IGetCartDataResponse {
  success: boolean;
  cartData: ICartItems;
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

export interface IOrderData {
  address: IPlaceOrderData;
  items: IOrderItem[];
  amount: string;
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
export interface IOrderDataResponse {
  success: boolean;
  message: string;
}

export interface IUserOrder {
  _id: string;
  userId: string;
  items: (IOrderItem & {
    status: string;
    payment: boolean;
    paymentMethod: string;
    date: number;
  })[];
  amount: number;
  address: IPlaceOrderData;
  status: string;
  paymentMethod: string;
  payment: boolean;
  date: number;
  __v: number;
}

export interface IGetUserOrdersResponse {
  orders: IUserOrder[];
  success?: boolean;
  message?: string;
}
