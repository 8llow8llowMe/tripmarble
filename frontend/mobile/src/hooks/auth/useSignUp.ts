import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { apiClient } from '@/apis/axiosClient';
import { useMutation } from '@tanstack/react-query';

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  nickname: string;
}

export interface SignUpResponse extends ApiResponseBase {
  dataBody: null;
}

export const postSignUp = async ({ email, password, name, nickname }: SignUpRequest) => {
  const { data } = await apiClient.post<SignUpResponse>(END_POINTS.SIGN_UP, {
    email,
    password,
    name,
    nickname,
  });

  return data;
};

const useSignUpMutaion = () => {
  const { mutate: signUp } = useMutation({
    mutationFn: postSignUp,
    onError: (error) => {
      console.log('회원가입 에러', error);
    },
  });

  return { signUp };
};

export default useSignUpMutaion;
