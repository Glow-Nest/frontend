import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetFromCookies } from "libs/cookies";
import { formatMinutesToReadableDuration, parseHHMMDurationToMinutes } from "libs/helpers";
import { Category, CategoryList } from "libs/types/ServiceCategory";

export type CreateCategoryRequest = {
  Name: string;
  Description: string;
  MediaUrls: string[];
};

export type serviceRequest = {
  categoryId: string;
  name: string;
  price: number;
  duration: string;
};

export const serviceApi = createApi({
  reducerPath: "serviceApi",
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
    getAllCategories: builder.query({
      query: () => ({
        url: "category/all",
        method: "POST",
      }),
    }),

    createCategory: builder.mutation<void, CreateCategoryRequest>({
      query: (body) => ({
        url: "owner/category/create",
        method: "POST",
        body,
      }),
    }),

    addServiceToCategory: builder.mutation<void, serviceRequest>({
      query: (body) => ({
        url: "owner/category/service/add",
        method: "POST",
        body,
      }),
      
    endpoints: (builder) => ({
        getAllServices: builder.query({
            query: () => ({
                url: "service/all",
                method: "POST",
            }),
        }),

        getAllCategoriesWithService: builder.query<CategoryList, void>({
            query: () => ({
                url: "/categories/services/all",
                method: "POST"
            }),
            transformResponse: (response: any): CategoryList => {
                const categories = response.categories ?? [];
              
                return {
                  categories: categories.map((cat: any) => ({
                    categoryId: cat.categoryId,
                    name: cat.name,
                    description: cat.description,
                    mediaUrls: cat.mediaUrls ?? [],
                    services: cat.services.map((srv: any) => {
                      const durationMinutes = parseHHMMDurationToMinutes(srv.duration);
                      return {
                        serviceId: srv.serviceId,
                        name: srv.name,
                        price: srv.price,
                        duration: srv.duration,
                        formattedDuration: formatMinutesToReadableDuration(durationMinutes)
                      };
                    })
                  }))
                };
              }
              
        })
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useLazyGetAllCategoriesQuery,
  useGetAllCategoriesWithServiceQuery,
  useLazyGetAllCategoriesWithServiceQuery,
  useCreateCategoryMutation,
  useAddServiceToCategoryMutation,
} = serviceApi;
