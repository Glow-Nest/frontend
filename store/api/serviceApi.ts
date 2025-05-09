import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetFromCookies } from "libs/cookies";
import {
  formatMinutesToReadableDuration,
  parseHHMMDurationToMinutes,
} from "libs/helpers";
import { Category, CategoryList } from "libs/types/ServiceCategory";

export type CreateCategoryRequest = {
  Name: string;
  Description: string;
  MediaUrls: string[];
};

export type UpdateCategoryNameRequest = {
  Id: string;
  Name: string;
};

export type UpdateCategoryDescriptionRequest = {
  Id: string;
  Description: string;
};

export type UpdateCategoryMediaUrlsRequest = {
  Id: string;
  MediaUrls: string[];
};

export type UpdateServiceNameRequest = {
  CategoryId: string;
  ServiceId: string;
  Name: string;
};

export type UpdateServicePriceRequest = {
  CategoryId: string;
  ServiceId: string;
  Price: number;
};

export type UpdateServiceDurationRequest = {
  CategoryId: string;
  ServiceId: string;
  Duration: string;
};

export type serviceRequest = {
  categoryId: string;
  name: string;
  price: number;
  duration: string;
};

export type DeleteServiceRequest = {
  CategoryId: string;
  Id: string;
};

export type DeleteCategoryRequest = {
  CategoryId: string;
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

    updateCategoryName: builder.mutation<void, UpdateCategoryNameRequest>({
      query: (body) => ({
        url: "owner/category/update/name",
        method: "POST",
        body,
      }),
    }),

    updateCategoryDescription: builder.mutation<
      void,
      UpdateCategoryDescriptionRequest
    >({
      query: (body) => ({
        url: "owner/category/update/description",
        method: "POST",
        body,
      }),
    }),

    updateCategoryMediaUrls: builder.mutation<
      void,
      UpdateCategoryMediaUrlsRequest
    >({
      query: (body) => ({
        url: "owner/category/update/media-url",
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
    }),

    getAllServices: builder.query({
      query: () => ({
        url: "service/all",
        method: "POST",
      }),
    }),

    updateServiceName: builder.mutation<void, UpdateServiceNameRequest>({
      query: (body) => ({
        url: "owner/service/update/name",
        method: "POST",
        body,
      }),
    }),

    updateServicePrice: builder.mutation<void, UpdateServicePriceRequest>({
      query: (body) => ({
        url: "owner/service/update/price",
        method: "POST",
        body,
      }),
    }),

    updateServiceDuration: builder.mutation<void, UpdateServiceDurationRequest>(
      {
        query: (body) => ({
          url: "owner/service/update/duration",
          method: "POST",
          body,
        }),
      }
    ),

    deleteService: builder.mutation<void, DeleteServiceRequest>({
      query: (body) => ({
        url: "owner/category/service/delete",
        method: "POST",
        body,
      }),
    }),

    deleteCategory: builder.mutation<void, DeleteCategoryRequest>({
      query: (body) => ({
        url: "owner/category/delete",
        method: "POST",
        body,
      }),
    }),

    getAllCategoriesWithService: builder.query<CategoryList, void>({
      query: () => ({
        url: "/categories/services/all",
        method: "POST",
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
                formattedDuration:
                  formatMinutesToReadableDuration(durationMinutes),
              };
            }),
          })),
        };
      },
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useLazyGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useAddServiceToCategoryMutation,
  useGetAllServicesQuery,
  useLazyGetAllServicesQuery,
  useGetAllCategoriesWithServiceQuery,
  useLazyGetAllCategoriesWithServiceQuery,
  useUpdateCategoryNameMutation,
  useUpdateCategoryDescriptionMutation,
  useUpdateCategoryMediaUrlsMutation,
  useUpdateServiceNameMutation,
  useUpdateServicePriceMutation,
  useUpdateServiceDurationMutation,
  useDeleteServiceMutation,
  useDeleteCategoryMutation,
} = serviceApi;
