import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Check that the backend URL exists
console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  }),
  endpoints: (builder) => ({
    createClient: builder.mutation({
      query: (user) => ({
        url: "clients/create",
        method: "POST",
        body: user,
      }),
    }),
    sendOtp: builder.mutation<void, { email: string; purpose: string }>({
      query: (body) => ({
        url: "clients/otp/create",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: builder.mutation<void, { email: string; otpCode: string }>({
      query: (body) => ({
        url: "clients/otp/verify",
        method: "POST",
        body,
      }),
    }),
    loginClient: builder.mutation<
      { username: string; token: string; email: string; role: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "clients/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useCreateClientMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLoginClientMutation,
} = clientApi;
