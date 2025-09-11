import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { authApiClient } from '@/apis/axiosClient';
import { useMutation } from '@tanstack/react-query';

export interface WithdrawResponse extends ApiResponseBase {
  dataBody: any;
}

export const postWithdraw = async () => {
  const { data } = await authApiClient.post<WithdrawResponse>(END_POINTS.USER.WITHDRAW);

  return data;
};

const useWithdrawMutaion = () => {
  const { mutateAsync: withdraw, isPending } = useMutation({
    mutationFn: postWithdraw,
    onError: (error) => {
      console.log('회원탈퇴 에러', error);
    },
  });

  return { withdraw, isPending };
};

export default useWithdrawMutaion;
