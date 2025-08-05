import { authApiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";

export const deleteUserAccount = () => authApiClient.delete("/users/me");

const useDeleteUserAccount = () => {
  const { mutate: deleteUserAccountMutate } = useMutation({
    mutationFn: deleteUserAccount,
    onError: (error) => {
      console.log("deleteUserAccount 에러", error);
    },
  });
  return { deleteUserAccountMutate };
};
export default useDeleteUserAccount;
