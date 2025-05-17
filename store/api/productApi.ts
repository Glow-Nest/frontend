import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetFromCookies } from "libs/cookies";
import {
  Product,
  ProductSummary,
  ProductWithId,
} from "libs/types/ProductTypes";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = GetFromCookies("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    createProduct: builder.mutation<void, Product>({
      query: (body) => ({
        url: "owner/product/create",
        method: "POST",
        body,
      }),
    }),

    getAllProducts: builder.query<
      { products: ProductSummary[]; totalCount: number },
      { page: number; pageSize: number }
    >({
      query: ({ page, pageSize }) => ({
        url: `products/all`,
        method: "POST",
        body: {
          page: page,
          pageSize: pageSize,
        },
      }),
    }),

    getProductsByName: builder.query<
      {
        products: {
          productId: string;
          name: string;
          price: number;
          imageUrl: string;
        }[];
      },
      { productName: string }
    >({
      query: ({ productName }) => ({
        url: `products/name/${encodeURIComponent(productName)}`,
        method: "POST",
        body: {
          productName: productName,
        },
      }),
    }),

    updateProductName: builder.mutation<void, { Id: string; Name: string }>({
      query: (body) => ({
        url: `owner/product/update/name`,
        method: "POST",
        body,
      }),
    }),

    updateProductDescription: builder.mutation<
      void,
      { Id: string; Description: string }
    >({
      query: (body) => ({
        url: `owner/product/update/description`,
        method: "POST",
        body,
      }),
    }),

    updateProductImageUrl: builder.mutation<
      void,
      { Id: string; ImageUrl: string }
    >({
      query: (body) => ({
        url: `owner/product/update/mediaUrl`,
        method: "POST",
        body,
      }),
    }),

    updateProductInventoryCount: builder.mutation<
      void,
      { Id: string; InventoryCount: number }
    >({
      query: (body) => ({
        url: `owner/product/update/inventoryCount`,
        method: "POST",
        body,
      }),
    }),

    updateProductPrice: builder.mutation<
      void,
      { productId: string; Price: number }
    >({
      query: (body) => ({
        url: `owner/product/update/price`,
        method: "POST",
        body,
      }),
    }),

    deleteProduct: builder.mutation<void, { Id: string }>({
      query: (body) => ({
        url: `owner/product/delete`,
        method: "POST",
        body,
      }),
    }),

    getProductById: builder.query<ProductWithId, { productId: string }>({
      query: ({ productId }) => ({
        url: `products/${productId}`,
        method: "POST",
      }),
    }),
  }),
});


export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByNameQuery,
  useLazyGetProductsByNameQuery,
  useLazyGetProductByIdQuery,
  useLazyGetAllProductsQuery,
  useUpdateProductNameMutation,
  useUpdateProductDescriptionMutation,
  useUpdateProductImageUrlMutation,
  useUpdateProductInventoryCountMutation,
  useUpdateProductPriceMutation,
  useDeleteProductMutation,
} = productApi;
