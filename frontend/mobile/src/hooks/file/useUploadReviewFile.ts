import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { apiClient } from '@/apis/axiosClient';
import { useMutation } from '@tanstack/react-query';

export interface UploadReviewFileRequest {
  tripSpotId: string;
  imageUris: string[];
}

export interface UploadReviewFileResponse extends ApiResponseBase {
  dataBody: { tempPhotoUrl: string }[];
}

// 간단 MIME 추론 (확장자 기준)
const guessMime = (uri: string) => {
  const u = uri.split('?')[0].toLowerCase();
  if (u.endsWith('.png')) return 'image/png';
  if (u.endsWith('.webp')) return 'image/webp';
  if (u.endsWith('.heic') || u.endsWith('.heif')) return 'image/heic';
  return 'image/jpeg';
};

export const postUploadReviewFile = async ({ tripSpotId, imageUris }: UploadReviewFileRequest) => {
  const form = new FormData();

  imageUris.forEach((uri, idx) => {
    // 파일명 추정: RN의 file:// or content:// 경로에서 안전하게 추출
    const rawName = uri.split('/').pop() || `photo_${Date.now()}_${idx}.jpg`;
    const name = decodeURIComponent(rawName).split('%2F').pop() || rawName;
    const type = guessMime(uri);

    form.append('imageFiles', { uri, name, type } as any);
  });

  const { data } = await apiClient.post<UploadReviewFileResponse>(
    END_POINTS.REVIEW.UPLOAD_PHOTO(tripSpotId),
    form,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );

  return data;
};

const useUploadReviewFileMutaion = () => {
  const { mutateAsync: uploadReviewFile, isPending } = useMutation({
    mutationFn: postUploadReviewFile,
    onError: (error: any) => {
      // 네트워크 로그를 보기 좋게
      console.log('❌ 리뷰 사진 업로드 실패', error);
      console.log('[Request config]', {
        url: error?.config?.url,
        method: error?.config?.method,
        headers: error?.config?.headers,
      });
      console.log('[Status]', error?.response?.status);
      console.log('[Response data]', error?.response?.data);
    },
  });

  return { uploadReviewFile, isPending };
};

export default useUploadReviewFileMutaion;
