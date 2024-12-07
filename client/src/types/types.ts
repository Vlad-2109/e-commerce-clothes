export interface ShopContextType {
  products: IProduct[];
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
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
