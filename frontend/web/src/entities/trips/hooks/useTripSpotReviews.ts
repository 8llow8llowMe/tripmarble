
import { apiClient } from "@/shared/lib/api/client";
import { dataHeader } from "@/shared/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export interface TripSpotReviewPhoto {
  tripSpotReviewPhotoId: string;
  photoUrl: string;
  orderNo: number;
}

export interface TripSpotReviewListItem {
  tripSpotReviewId: string;
  tripSpotId: string;
  memberId: string;
  content: string;
  rating: number;
  reviewSourceTypeCode: string;
  reviewSourceTypeDescription: string;
  photos: TripSpotReviewPhoto[];
}

export interface TripSpotReviewsResponse {
  dataHeader: dataHeader;
  dataBody: {
    contents: TripSpotReviewListItem[];
    hasNext: boolean;
  };
}

export const getTripSpotReviews = (
  tripSpotId: string,
  lastTripSpotReviewId: string | null = null,
  size = 10
): Promise<AxiosResponse<TripSpotReviewsResponse>> => {
  const params = new URLSearchParams();
  if (lastTripSpotReviewId) {
    params.append("lastTripSpotReviewId", lastTripSpotReviewId);
  }
  if (size) {
    params.append("size", size.toString());
  }
  const query = params.toString();
  const suffix = query ? `?${query}` : "";
  return apiClient.get<TripSpotReviewsResponse>(
    `/trip-spots/${tripSpotId}/reviews${suffix}`
  );
};

const useTripSpotReviews = (tripSpotId: string, size = 10) =>
  useInfiniteQuery<AxiosResponse<TripSpotReviewsResponse>, Error>({
    enabled: Boolean(tripSpotId),
    queryKey: ["tripSpotReviews", tripSpotId, size],
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) =>
      getTripSpotReviews(tripSpotId, (pageParam as string | null) ?? null, size),
    getNextPageParam: (lastPage) => {
      const { contents, hasNext } = lastPage.data.dataBody;
      if (!hasNext || contents.length === 0) {
        return undefined;
      }
      return contents[contents.length - 1].tripSpotReviewId;
    },
  });

export default useTripSpotReviews;
