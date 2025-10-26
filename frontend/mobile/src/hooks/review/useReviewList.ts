import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '@/apis/axiosClient';
import { QUERY_KEY } from '@/constants/keys';

interface Props {
  tripSpotId: string;
  sourceType?: string;
  size?: number;
  orderType?: 'ASC' | 'DESC';
}

export interface ReviewListRequest {
  tripSpotId: string;
  sourceType?: string;
  lastTripSpotReviewId?: string;
  size?: number;
  orderType?: 'ASC' | 'DESC';
}

export interface ReviewListResponse extends ApiResponseBase {
  dataBody: {
    contents: {
      tripSpotId: string;
      contentId: string;
      tripSpotName: string;
      originalImageUrl: string | null;
    }[];
    hasNext: boolean;
  };
}

export const getReviewList = async ({
  tripSpotId,
  sourceType,
  lastTripSpotReviewId,
  size = 10,
  orderType,
}: ReviewListRequest) => {
  const params: Record<string, string | number> = {};
  if (sourceType !== undefined) params.sourceType = sourceType;
  if (lastTripSpotReviewId !== undefined) params.lastTripSpotReviewId = lastTripSpotReviewId;
  if (size !== undefined) params.size = size;
  if (orderType) params.orderType = orderType;

  const { data } = await apiClient.get<ReviewListResponse>(
    END_POINTS.REVIEW.LIST_REVIEWS(tripSpotId),
    { params },
  );

  return data;
};

const useReviewListInfiniteQuery = ({ tripSpotId, sourceType, size = 10, orderType }: Props) => {
  return useInfiniteQuery({
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      getReviewList({
        tripSpotId,
        sourceType,
        lastTripSpotReviewId: pageParam,
        size,
        orderType,
      }),
    queryKey: [QUERY_KEY.REVIEW.LIST_REVIEWS, tripSpotId, sourceType ?? ''],
    enabled: !!tripSpotId,
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

export default useReviewListInfiniteQuery;
