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
    tagTypes: ['Orders'],

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

        getAllOrders: builder.query<
            { orders: OrderResponseDto[]; totalCount: number },
            { status: string; page: number; pageSize: number }
        >({
            query: ({ status, page, pageSize }) => ({
                url: "owner/orders",
                method: "POST",
                body: {
                    Status: status,
                    Page: page,
                    PageSize: pageSize,
                },
            }),
            providesTags: ['Orders'],
            transformResponse: (response: {
                orderResponseDtos: OrderResponseDto[];
                totalCount: number;
            }) => ({
                orders: response.orderResponseDtos,
                totalCount: response.totalCount,
            }),
        }),

        markOrderAsReadyForPickup: builder.mutation<void, string>({
            query: (orderId) => ({
                url: `owner/orders/${orderId}/mark-as-ready`,
                method: "POST",
                body: {},
            }),
            invalidatesTags: ['Orders'],
        }),

        markOrderAsCompleted: builder.mutation<void, string>({
            query: (orderId) => ({
                url: `owner/orders/${orderId}/mark-as-completed`,
                method: "POST",
                body: {},
            }),
            invalidatesTags: ['Orders'],
        }),

        markOrderAsCancelled: builder.mutation<void, string>({
            query: (orderId) => ({
                url: `owner/orders/${orderId}/mark-as-cancelled`,
                method: "POST",
                body: {},
            }),
            invalidatesTags: ['Orders'],
        })
    }),
});

export const {
    useCreateOrderMutation,
    useCreateCheckoutSessionMutation,
    useGetAllOrdersQuery,
    useMarkOrderAsCompletedMutation,
    useMarkOrderAsReadyForPickupMutation,
    useMarkOrderAsCancelledMutation
    } = orderApi;