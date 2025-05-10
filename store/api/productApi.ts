import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetFromCookies } from "libs/cookies";
import { Product, ProductSummary, ProductWithId } from "libs/types/ProductTypes";

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

    getAllProducts: builder.query<{ products: ProductSummary[], totalCount: number }, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => ({
        url: `products/all`,
        method: "POST",
        body: {
          page: page,
          pageSize: pageSize
        }
      }),
    }),

    getProductById: builder.query<ProductWithId, { productId: string }>({
      query: ({ productId }) => ({
        url: `products/${productId}`,
        method: "POST",
      }),
    })

  }),
});

export const { useCreateProductMutation, useGetAllProductsQuery, useGetProductByIdQuery } = productApi;
