import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/apis/axiosClient';
import { QUERY_KEY } from '@/constants/keys';

interface Props {
  tripSpotId: string;
  tripSpotReviewId: string;
}

export interface ReviewRequest {
  tripSpotId: string;
  tripSpotReviewId: string;
}

export interface ReviewPhotoType {
  tripSpotReviewPhotoId: string;
  photoUrl: string;
  orderNo: number;
}

export interface ReviewResponse extends ApiResponseBase {
  dataBody: {
    tripSpotReviewId: string;
    tripSpotName: string;
    reviewerNickname: string;
    reviewerProfileImageUrl: string;
    content: string;
    rating: number;
    reviewSourceTypeCode: string;
    reviewSourceTypeDescription: string;
    createdAt: string; //  '2025-09-10 14:23:45';
    updatedAt: string; //'2025-09-12 09:15:20';
    photos: ReviewPhotoType[];
  };
}

export const getReview = async ({ tripSpotId, tripSpotReviewId }: ReviewRequest) => {
  const { data } = await apiClient.get<ReviewResponse>(
    END_POINTS.REVIEW.DETAIL(tripSpotId, tripSpotReviewId),
  );

  return data;
};

const useReviewQuery = ({ tripSpotId, tripSpotReviewId }: Props) => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryFn: () => getReview({ tripSpotId, tripSpotReviewId }),
    queryKey: [QUERY_KEY.REVIEW.DETAIL, tripSpotId, tripSpotReviewId],
    enabled: !!tripSpotId && !!tripSpotReviewId,
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
};

export default useReviewQuery;
