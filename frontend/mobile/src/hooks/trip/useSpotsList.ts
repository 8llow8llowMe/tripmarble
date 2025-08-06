import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/apis/axiosClient';
import { QUERY_KEY } from '@/constants/keys';

interface Props {
  representativeRegionId: number;
  size?: number;
}

export interface TripSpotListRequest {
  representativeRegionId: number;
  lastTripSpotId?: number;
  size?: number;
}

export interface TripSpotListResponse extends ApiResponseBase {
  dataBody: {
    contents: {
      tripSpotId: number;
      contentId: number;
      tripSpotName: string;
      originalImageUrl: string | null;
    }[];
    hasNext: boolean;
  };
}

export const getTripSpotList = async ({
  representativeRegionId,
  lastTripSpotId,
  size = 10,
}: TripSpotListRequest) => {
  const params: any = {};
  if (lastTripSpotId !== undefined) params.lastTripSpotId = lastTripSpotId;
  if (size !== undefined) params.size = size;

  const { data } = await apiClient.get<TripSpotListResponse>(
    END_POINTS.TRIP.LIST_SPOTS(representativeRegionId),
    { params },
  );

  return data;
};

const useTripSpotListInfiniteQuery = ({ representativeRegionId, size = 10 }: Props) => {
  return useInfiniteQuery({
    queryFn: ({ pageParam }: { pageParam?: number }) =>
      getTripSpotList({
        representativeRegionId,
        lastTripSpotId: pageParam,
        size,
      }),
    queryKey: [QUERY_KEY.TRIP.SPOT, representativeRegionId],
    enabled: !!representativeRegionId,
    getNextPageParam: (lastPage) => {
      const { dataBody } = lastPage || {};
      if (dataBody?.hasNext && dataBody.contents.length > 0) {
        return dataBody.contents[dataBody.contents.length - 1].tripSpotId;
      }
      return undefined;
    },
    initialPageParam: undefined,
  });
};

export default useTripSpotListInfiniteQuery;
