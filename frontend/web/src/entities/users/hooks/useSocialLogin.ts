import { useAppDispatch } from "@/entities/users/model";
import { fetchMe } from "@/entities/users/model/user";
import { authApiClient } from "@/shared/lib/api/client";
import { dataHeader } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export interface SocialLoginResponse {
  dataHeader: dataHeader;
  dataBody: {
    accessToken: string;
    memberId?: number;
  };
}

export interface SocialLoginParams {
  provider: string;
  code: string;
}

export const socialLogin = async (
  loginData: SocialLoginParams
): Promise<SocialLoginResponse> => {
  const { data } = await authApiClient.get<SocialLoginResponse>(
    `/auth/${loginData.provider}/login`,
    {
      params: { code: loginData.code },
    }
  );
  return data;
};

const useSocialLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    mutate: socialLoginMutate,
    isPending: isSocialLoginPending,
    isError: isSocialLoginError,
  } = useMutation<
    SocialLoginResponse,
    Error,
    SocialLoginParams
  >({
    mutationFn: socialLogin,
    onSuccess: async (res) => {
      const { accessToken, memberId } = res.dataBody;

      localStorage.setItem("accessToken", accessToken);
      if (memberId) localStorage.setItem("memberId", memberId.toString());

      await dispatch(fetchMe());
      router.push("/");

      toast.success("환영합니다! 로그인되었습니다.", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    },
    onError: (error) => {
      console.error("❌ 소셜 로그인 에러:", error);
      toast.error("로그인 중 오류가 발생했습니다.");
    },
  });

  return { socialLoginMutate, isSocialLoginPending, isSocialLoginError };
};

export default useSocialLogin;
