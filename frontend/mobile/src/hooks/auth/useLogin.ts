import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { apiClient } from '@/apis/axiosClient';
import { useMutation } from '@tanstack/react-query';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends ApiResponseBase {
  dataBody: {
    accessToken: string;
    memberId: number;
  };
}

export const postLogin = async ({ email, password }: LoginRequest) => {
  const { data } = await apiClient.post<LoginResponse>(END_POINTS.LOGIN, {
    email,
    password,
  });

  return data;
};

const useLoginMutaion = () => {
  const { mutate: login } = useMutation({
    mutationFn: postLogin,
    onError: (error) => {
      console.log('로그인 에러', error);
    },
  });

  return { login };
};

export default useLoginMutaion;
