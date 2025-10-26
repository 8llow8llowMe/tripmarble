import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { apiClient } from '@/apis/axiosClient';
import { useMutation } from '@tanstack/react-query';

export interface UploadReviewFileRequest {
  tripSpotId: string;
  imageFiles: string[];
}

export interface UploadReviewFileResponse extends ApiResponseBase {
  dataBody: {
    tempPhotoUrl: string;
  }[];
}

export const postUploadReviewFile = async ({ tripSpotId, imageFiles }: UploadReviewFileRequest) => {
  const { data } = await apiClient.post<UploadReviewFileResponse>(
    END_POINTS.REVIEW.UPLOAD_PHOTO(tripSpotId),
    {
      imageFiles,
    },
  );

  return data;
};

const useUploadReviewFileMutaion = () => {
  const { mutateAsync: uploadReviewFile, isPending } = useMutation({
    mutationFn: postUploadReviewFile,
    onError: (error) => {
      console.log('❌ 리뷰 사진 업로드 실패', error);
    },
  });

  return { uploadReviewFile, isPending };
};

export default useUploadReviewFileMutaion;
