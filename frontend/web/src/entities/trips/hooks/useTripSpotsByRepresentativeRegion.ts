import { apiClient } from "@/shared/lib/api/client";
import { dataHeader } from "@/shared/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export interface TripSpot {
  tripSpotId: number;
  contentId: number;
  tripSpotName: string;
  originalImageUrl: string;
  latitude?: number | string;
  longitude?: number | string;
}
export interface TripSpotsResponse {
  dataHeader: dataHeader;
  dataBody: {
    contents: TripSpot[];
    hasNext: boolean;
  };
}

// 대표 여행지에 따른 여행지 목록 조회 (무한 스크롤)
export const getTripSpotsByRepresentativeRegion = (
  representativeRegionId: string,
  contentTypeId: string[],
  lastTripSpotId: number | null = null,
  size: number = 10
): Promise<AxiosResponse<TripSpotsResponse>> => {
  const params = new URLSearchParams();
  if (lastTripSpotId !== null) {
    params.append("lastTripSpotId", lastTripSpotId.toString());
  }
  if (contentTypeId.length) {
    params.append("contentTypeId", contentTypeId.join(","));
  }
  if (size) {
    params.append("size", size.toString());
  }
  return apiClient.get<TripSpotsResponse>(
    `/trip-spots/by-representative-region/${representativeRegionId}?${params.toString()}`
  );
};

const useTripSpotsByRepresentativeRegion = (
  representativeRegionId: string,
  selectedFilter: string[]
) =>
  useInfiniteQuery<AxiosResponse<TripSpotsResponse>, Error>({
    queryKey: [
      "tripSpotsByRepresentativeRegion",
      representativeRegionId,
      selectedFilter,
    ],
    queryFn: ({ pageParam }) =>
      getTripSpotsByRepresentativeRegion(
        representativeRegionId,
        selectedFilter,
        (pageParam ?? null) as number | null
      ),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      const contents = lastPage.data.dataBody.contents;
      const hasNext = lastPage.data.dataBody.hasNext;
      if (!hasNext || contents.length === 0) return undefined;
      return contents[contents.length - 1].tripSpotId;
    },
  });

export default useTripSpotsByRepresentativeRegion;
