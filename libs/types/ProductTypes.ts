export type Product = {
  Name: string;
  Description: string;
  Price: number;
  ImageUrl: string;
  InventoryCount: number;
};

export type ProductState = {
  [productId: string]: Product;
};
