import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { authApiClient } from '@/apis/axiosClient';
import { useMutation } from '@tanstack/react-query';

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface VerifyCodeResponse extends ApiResponseBase {
  dataBody: {};
}

export const postVerifyCode = async ({ email, code }: VerifyCodeRequest) => {
  const { data } = await authApiClient.post<VerifyCodeResponse>(END_POINTS.VERIFY_CODE, {
    email,
    code,
  });

  return data;
};

const useVerifyCodeMutaion = () => {
  const { mutateAsync: verifyCode, isPending } = useMutation({
    mutationFn: postVerifyCode,
    onError: (error) => {
      console.log('이메일 인증코드 검증 에러', error);
    },
  });

  return { verifyCode, isPending };
};

export default useVerifyCodeMutaion;
