export interface Product {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  inventoryCount: number;
};

export type ProductState = {
  [productId: string]: ProductWithId;
};


export type ProductSummary = {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface ProductWithId extends Product {
  productId: string;
}