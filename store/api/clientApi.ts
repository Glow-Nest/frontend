import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Check that the backend URL exists
if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    throw new Error("Environment variable BACKEND_URL is not defined! Make sure it's set in .env or via deployment.");
}

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
        sendOtp: builder.mutation<void, { email: string; purpose: string }>({
            query: (body) => ({
                url: 'clients/otp/create',
                method: 'POST',
                body,
            }),
        }),
        verifyOtp: builder.mutation<void, { email: string; otpCode: string }>({
            query: (body) => ({
                url: 'clients/otp/verify',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useCreateClientMutation, useSendOtpMutation, useVerifyOtpMutation } = clientApi;
