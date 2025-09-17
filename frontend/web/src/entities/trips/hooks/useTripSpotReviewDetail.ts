
import { apiClient } from "@/shared/lib/api/client";
import { dataHeader } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export interface TripSpotReviewDetailPhoto {
  tripSpotReviewPhotoId: string;
  photoUrl: string;
  orderNo: number;
}

export interface TripSpotReviewDetail {
  tripSpotReviewId: string;
  tripSpotId: string;
  tripSpotName: string;
  reviewerNickname: string;
  reviewerProfileImageUrl: string | null;
  content: string;
  rating: number;
  reviewSourceTypeCode: string;
  reviewSourceTypeDescription: string;
  createdAt: string;
  updatedAt: string;
  photos: TripSpotReviewDetailPhoto[];
}

export interface TripSpotReviewDetailResponse {
  dataHeader: dataHeader;
  dataBody: TripSpotReviewDetail;
}

export const getTripSpotReviewDetail = (
  tripSpotId: string,
  tripSpotReviewId: string
): Promise<AxiosResponse<TripSpotReviewDetailResponse>> =>
  apiClient.get<TripSpotReviewDetailResponse>(
    `/trip-spots/${tripSpotId}/reviews/${tripSpotReviewId}`
  );

const useTripSpotReviewDetail = (
  tripSpotId: string,
  tripSpotReviewId: string | null
) =>
  useQuery<AxiosResponse<TripSpotReviewDetailResponse>, Error>({
    enabled: Boolean(tripSpotId && tripSpotReviewId),
    queryKey: ["tripSpotReviewDetail", tripSpotId, tripSpotReviewId],
    queryFn: () =>
      getTripSpotReviewDetail(tripSpotId, tripSpotReviewId as string),
  });

export default useTripSpotReviewDetail;
