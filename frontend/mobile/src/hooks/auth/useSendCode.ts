import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { authApiClient } from '@/apis/axiosClient';
import { useMutation } from '@tanstack/react-query';

export interface SendCodeRequest {
  email: string;
}

export interface SendCodeResponse extends ApiResponseBase {
  dataBody: {};
}

export const postSendCode = async ({ email }: SendCodeRequest) => {
  const { data } = await authApiClient.post<SendCodeResponse>(
    END_POINTS.SEND_CODE,
    {},
    {
      params: { email },
    },
  );

  return data;
};

const useSendCodeMutaion = () => {
  const { mutateAsync: sendCode, isPending } = useMutation({
    mutationFn: postSendCode,
    onError: (error) => {
      console.log('이메일 인증코드 전송 에러', error);
    },
  });

  return { sendCode, isPending };
};

export default useSendCodeMutaion;
