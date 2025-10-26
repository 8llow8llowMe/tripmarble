import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/apis/axiosClient';
import { QUERY_KEY } from '@/constants/keys';

interface Props {
  tripSpotId: string;
  sourceType?: string;
  photoLimit?: number;
}

export interface ReviewSummaryRequest {
  tripSpotId: string;
  sourceType?: string;
  photoLimit?: number;
}

export interface RatingDistributionType {
  rating: number;
  count: number;
}

export interface SamplePhotoType {
  tripSpotReviewPhotoId: number;
  photoUrl: string;
}

export interface ReviewSummaryResponse extends ApiResponseBase {
  dataBody: {
    totalCount: number;
    averageRating: number;
    ratingDistributions: RatingDistributionType[];
    samplePhotos: SamplePhotoType[];
  };
}

export const getReviewSummary = async ({
  tripSpotId,
  sourceType,
  photoLimit = 3,
}: ReviewSummaryRequest) => {
  const params: Record<string, string | number> = {};
  if (sourceType !== undefined) params.sourceType = sourceType;
  if (photoLimit !== undefined) params.photoLimit = photoLimit;

  const { data } = await apiClient.get<ReviewSummaryResponse>(
    END_POINTS.REVIEW.SUMMARY(tripSpotId),
    {
      params,
    },
  );

  return data;
};

const useReviewSummaryQuery = ({ tripSpotId, sourceType, photoLimit }: Props) => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryFn: () => getReviewSummary({ tripSpotId, sourceType, photoLimit }),
    queryKey: [QUERY_KEY.REVIEW.SUMMARY, tripSpotId],
    enabled: !!tripSpotId,
  });

  return {
    reviewSummary: data,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
};

export default useReviewSummaryQuery;
