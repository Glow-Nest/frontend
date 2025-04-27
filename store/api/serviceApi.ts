import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
        })
    }),
});

export const { useGetAllServicesQuery, useLazyGetAllServicesQuery, useGetAllCategoriesWithServiceQuery, useLazyGetAllCategoriesWithServiceQuery } = serviceApi;