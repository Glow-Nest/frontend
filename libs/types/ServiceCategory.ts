export type Service = {
  serviceId: string;
  name: string;
  price: number;
  duration: string;

  formattedDuration?: string;
};

export type Category = {
  categoryId: string;
  name: string;
  description: string;
  mediaUrls: string[];
  services: Service[];
};

export type CategoryList = {
  categories: Category[];
};

export type ServiceCategoryState = {
  [categoryId: string]: Category;
};
