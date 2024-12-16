export interface ShopContextType {
  products: IProduct[];
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: ICartItems;
  addToCart: (itemId: string, size: string) => void;
  getCartCount: () => number;
  updateQuantity: (itemId: string, size: string, quantity: number) => void;
  getCartAmount: () => number;
  backendUrl: string;
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