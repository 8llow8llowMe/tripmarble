import { authApiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";

export const logout = () => authApiClient.post("/auth/logout");

const useLogout = () => {
  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
    },
    onError: (error) => {
      console.log("logout 에러", error);
    },
  });
  return { logoutMutate };
};
export default useLogout;
