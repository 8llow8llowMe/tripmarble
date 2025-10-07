import { apiClient } from "@/shared/lib/api/client";
import { ApiResponse } from "@/shared/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import type { TripSpotReviewListItem } from "@/entities/trips/hooks/useTripSpotReviews";

export type ReviewSourceType = "GENERAL" | "GAME_MISSION";
export type ReviewOrderType = "ASC" | "DESC";

export interface MyReviewsResponse {
  contents: TripSpotReviewListItem[];
  hasNext: boolean;
}

export interface MyReviewsParams {
  sourceType?: ReviewSourceType;
  size?: number;
  orderType?: ReviewOrderType;
}

export interface MyReviewsFetchParams extends MyReviewsParams {
  lastTripSpotReviewId?: string | null;
}

export const fetchMyReviews = (params?: MyReviewsFetchParams) => {
  const { lastTripSpotReviewId, ...rest } = params ?? {};
  const queryParams: Record<string, unknown> = { ...rest };
  if (lastTripSpotReviewId) {
    queryParams.lastTripSpotReviewId = lastTripSpotReviewId;
  }
  return apiClient.get<ApiResponse<MyReviewsResponse>>("/me/reviews", {
    params: queryParams,
  });
};

const useMyReviews = (params?: MyReviewsParams) => {
  const queryKey: (string | number | undefined)[] = [
    "myReviews",
    params?.sourceType ?? "ALL",
    params?.size ?? 10,
    params?.orderType ?? "DESC",
  ];

  return useQuery<AxiosResponse<ApiResponse<MyReviewsResponse>>>({
    queryKey,
    queryFn: () => fetchMyReviews(params),
  });
};

export const useMyReviewsInfinite = (params?: MyReviewsParams) =>
  useInfiniteQuery<AxiosResponse<ApiResponse<MyReviewsResponse>>>({
    queryKey: [
      "myReviewsInfinite",
      params?.sourceType ?? "ALL",
      params?.size ?? 10,
      params?.orderType ?? "DESC",
    ],
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) =>
      fetchMyReviews({
        ...params,
        lastTripSpotReviewId:
          (pageParam as string | null | undefined) ?? undefined,
      }),
    getNextPageParam: (lastPage) => {
      const { contents, hasNext } = lastPage.data.dataBody;
      if (!hasNext || contents.length === 0) return undefined;
      return contents[contents.length - 1].tripSpotReviewId;
    },
  });

export default useMyReviews;
