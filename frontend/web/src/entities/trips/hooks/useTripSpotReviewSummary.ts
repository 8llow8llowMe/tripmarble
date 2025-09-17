
import { apiClient } from "@/shared/lib/api/client";
import { dataHeader } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export interface TripSpotReviewRatingDistribution {
  rating: number;
  count: number;
}

export interface TripSpotReviewSamplePhoto {
  tripSpotReviewPhotoId: string;
  photoUrl: string;
}

export interface TripSpotReviewSummary {
  totalCount: number;
  averageRating: number;
  ratingDistributions: TripSpotReviewRatingDistribution[];
  samplePhotos: TripSpotReviewSamplePhoto[];
}

export interface TripSpotReviewSummaryResponse {
  dataHeader: dataHeader;
  dataBody: TripSpotReviewSummary;
}

export const getTripSpotReviewSummary = (
  tripSpotId: string,
  photoLimit = 3
): Promise<AxiosResponse<TripSpotReviewSummaryResponse>> =>
  apiClient.get<TripSpotReviewSummaryResponse>(
    `/trip-spots/${tripSpotId}/reviews/summary`,
    {
      params: { photoLimit },
    }
  );

const useTripSpotReviewSummary = (tripSpotId: string, photoLimit = 3) =>
  useQuery<AxiosResponse<TripSpotReviewSummaryResponse>, Error>({
    enabled: Boolean(tripSpotId),
    queryKey: ["tripSpotReviewSummary", tripSpotId, photoLimit],
    queryFn: () => getTripSpotReviewSummary(tripSpotId, photoLimit),
  });

export default useTripSpotReviewSummary;
