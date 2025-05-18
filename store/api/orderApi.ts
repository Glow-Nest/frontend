import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "inspector";
import { GetFromCookies } from "libs/cookies";
import { Order, OrderResponseDto } from "libs/types/OrderTypes";



export const orderApi = createApi({
    reducerPath: "orderApi",
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
        createOrder: builder.mutation<{ orderId: string }, Order>({
            query: (order) => ({
                url: "/order/create",
                method: "POST",
                body: order,
            }),
        }),

        createCheckoutSession: builder.mutation<{ sessionId: string }, string>({
            query: (orderId) => ({
                url: `order/stripe/checkout-session/${orderId}`,
                method: "POST",
                body: {}
            })
        }),

        getAllOrders: builder.query<OrderResponseDto[], { status: string }>({
            query: ({ status }) => {
                // const queryString = status ? `?status=${status}` : "";
                return {
                    url: "owner/orders",
                    method: "POST",
                    body: {
                        Status: status,
                    }
                };
            },
            transformResponse: (response: { orderResponseDtos: OrderResponseDto[] }) =>
                response.orderResponseDtos,
        }),
    }),
});

export const { useCreateOrderMutation, useCreateCheckoutSessionMutation, useGetAllOrdersQuery } = orderApi;