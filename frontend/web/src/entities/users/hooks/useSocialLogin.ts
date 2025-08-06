import { authApiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";

export interface SocialLoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface SocialLoginParams {
  provider: string;
  code: string;
}

export const socialLogin = async (
  loginData: SocialLoginParams
): Promise<SocialLoginResponse> => {
  console.log(loginData);
  const { data } = await authApiClient.get<SocialLoginResponse>(
    `/auth/${loginData.provider}/login`,
    { params: loginData }
  );
  return data;
};

const useSocialLogin = () => {
  return useMutation<SocialLoginResponse, Error, SocialLoginParams>({
    mutationFn: socialLogin,
  });
};

export default useSocialLogin;
