import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    }),
});

export const { useGetAllServicesQuery, useLazyGetAllServicesQuery} = serviceApi;