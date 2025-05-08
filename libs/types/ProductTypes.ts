export type Product = {
  name: string;
  description: string;
  price: number;
  mediaUrls: string;
  inventoryCount: number;
};

export type ProductState = {
  [productId: string]: Product;
};
