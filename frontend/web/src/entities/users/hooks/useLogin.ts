import { authApiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";

export const login = (credentials: { email: string; password: string }) =>
  authApiClient.post("/auth/login", credentials);

const useLogin = () => {
  const { mutate: loginMutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
      console.log("login 에러", error);
    },
  });
  return { loginMutate };
};
export default useLogin;
