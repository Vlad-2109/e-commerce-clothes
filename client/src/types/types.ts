export interface ShopContextType {
  products: IProduct[];
  currency: string;
  delivery_fee: number;
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
