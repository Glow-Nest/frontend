import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const serviceApi = createApi({
    reducerPath: "serviceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    }),
    endpoints: (builder) => ({
        getServices: builder.mutation({
            query: () => ({
                url: "services/",
                method: "POST",
            }),
        }),
    }),
});

export const { useGetServicesMutation } = serviceApi;