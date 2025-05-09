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


export type ProductSummary = {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
}


