import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientApi = createApi({
    reducerPath: 'clientApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    }),
    endpoints: (builder) => ({
        createClient: builder.mutation({
            query: (user) => ({
                url: "clients/create",
                method: "POST",
                body: user
            }),
        }),
    }),
});

export const { useCreateClientMutation } = clientApi;