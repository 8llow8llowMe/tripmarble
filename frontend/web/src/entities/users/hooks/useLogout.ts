import { authApiClient, setSkipAuthFailure } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";

export const logout = () => authApiClient.post("/auth/logout");

const useLogout = () => {
  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onMutate: () => {
      setSkipAuthFailure(true);
    },
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("memberId");
    },
    onError: (error) => {
      console.log("logout 에러", error);
    },
    onSettled: () => {
      setTimeout(() => setSkipAuthFailure(false), 1200);
    },
  });
  return { logoutMutate };
};
export default useLogout;
