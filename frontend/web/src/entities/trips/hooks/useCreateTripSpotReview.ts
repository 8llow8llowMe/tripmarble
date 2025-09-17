
import { apiClient } from "@/shared/lib/api/client";
import { dataHeader } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export interface CreateTripSpotReviewRequest {
  content: string;
  rating: number;
  photoUrls?: string[];
}

export interface CreateTripSpotReviewResponse {
  dataHeader: dataHeader;
  dataBody: {
    tripSpotReviewId: string;
  };
}

export const createTripSpotReview = (
  tripSpotId: string,
  payload: CreateTripSpotReviewRequest
): Promise<AxiosResponse<CreateTripSpotReviewResponse>> =>
  apiClient.post<CreateTripSpotReviewResponse>(
    `/trip-spots/${tripSpotId}/reviews`,
    payload
  );

const useCreateTripSpotReview = (tripSpotId: string) =>
  useMutation<
    AxiosResponse<CreateTripSpotReviewResponse>,
    Error,
    CreateTripSpotReviewRequest
  >({
    mutationKey: ["createTripSpotReview", tripSpotId],
    mutationFn: (payload) => createTripSpotReview(tripSpotId, payload),
  });

export default useCreateTripSpotReview;
