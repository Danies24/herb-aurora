export interface ProductVariant {
  size: string;
  price: number;
  weight: string;
  strikedPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  target: string;
  benefit: string;
  description: string;
  ingredients: string;
  usage: string;
  images: string[];
  color: string;
  features?: string[];
  variants: ProductVariant[];
  shelfLife?: string;
  storage?: string;
  warnings?: string;
  rank: number;
  category: string;
  rating: number;
  strikedPrice?: number;
}
