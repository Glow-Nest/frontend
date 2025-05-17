import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetFromCookies } from "libs/cookies";

export interface ServiceReview {
  serviceReviewId: string;
  userId: string;
  serviceId: string;
  rating: number;
  reviewMessage: string;
}

export interface ReviewsResponse {
  reviews: ServiceReview[];
}

export type CreateServiceReviewRequest = {
  ReviewById: string;
  Rating: number;
  ReviewMessage: string;
  ServiceId: string;
};

export const serviceReviewApi = createApi({
  reducerPath: "serviceReviewApi",
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
  tagTypes: ["ServiceReviews"],

  endpoints: (builder) => ({
    getServiceReviewsById: builder.query<ReviewsResponse, string>({
      query: (serviceId) => ({
        url: `serviceReview/${serviceId}`,
        method: "POST",
        body: { serviceId },
      }),
      providesTags: (result, error, serviceId) => [
        { type: "ServiceReviews", id: serviceId },
      ],
    }),

    createServiceReview: builder.mutation<void, CreateServiceReviewRequest>({
      query: (body) => ({
        url: "serviceReview/create",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { ServiceId }) => [
        { type: "ServiceReviews", id: ServiceId },
      ],
    }),
  }),
});

export const { useCreateServiceReviewMutation, useGetServiceReviewsByIdQuery } =
  serviceReviewApi;
