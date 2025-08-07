import { useAppDispatch } from "@/entities/users/model";
import { fetchMe } from "@/entities/users/model/user";
import { authApiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const login = (credentials: { email: string; password: string }) =>
  authApiClient.post("/auth/login", credentials);

const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { mutate: loginMutate } = useMutation({
    mutationFn: login,
    onSuccess: async (res) => {
      const { accessToken, memberId } = res.data.dataBody;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("memberId", memberId.toString());
      await dispatch(fetchMe());

      router.push("/");
      toast.success("환영합니다! 로그인되었습니다.", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
    onError: (err: any) => {
      toast.error(err.response.data.dataHeader.resultMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    },
  });
  return { loginMutate };
};
export default useLogin;
