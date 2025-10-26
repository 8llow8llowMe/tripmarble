import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { apiClient } from '@/apis/axiosClient';
import { useMutation } from '@tanstack/react-query';

export interface WriteReviewRequest {
  tripSpotId: string;
  content: string;
  rating: number;
  photoUrls: string[];
}

export interface WriteReviewResponse extends ApiResponseBase {
  dataBody: {
    tripSpotReviewId: string;
    tripSpotId: string;
    reviewerId: string;
    content: string;
    rating: number;
    reviewSourceTypeCode: string; // GENERAL |
    reviewSourceTypeDescription: string;
    photoUrls: string[];
  };
}

export const postWriteReview = async ({
  tripSpotId,
  content,
  rating,
  photoUrls,
}: WriteReviewRequest) => {
  const { data } = await apiClient.post<WriteReviewResponse>(END_POINTS.REVIEW.WRITE(tripSpotId), {
    content,
    rating,
    photoUrls,
  });

  return data;
};

const useWriteReviewMutaion = () => {
  const { mutateAsync: writeReview, isPending } = useMutation({
    mutationFn: postWriteReview,
    onError: (error) => {
      console.log('❌ 리뷰 등록 실패', error);
    },
  });

  return { writeReview, isPending };
};

export default useWriteReviewMutaion;
