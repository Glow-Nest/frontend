export type ServiceReview = {
  serviceId: string;
  reviewId: string;
  rating: number;
  reviewMessage: string;
};

export type ServiceReviewState = {
  [reviewId: string]: ServiceReview;
};
