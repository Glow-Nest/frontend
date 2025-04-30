import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { formatMinutesToReadableDuration, parseHHMMDurationToMinutes } from "libs/helpers";
import { Category, CategoryList } from "libs/types/ServiceCategory";

export const serviceApi = createApi({
    reducerPath: "serviceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
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
});

export const { useGetAllServicesQuery, useLazyGetAllServicesQuery, useGetAllCategoriesWithServiceQuery, useLazyGetAllCategoriesWithServiceQuery } = serviceApi;