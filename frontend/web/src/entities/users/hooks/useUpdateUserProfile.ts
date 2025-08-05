import { authApiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";

export const updateUserProfile = (data: any) =>
  authApiClient.patch("members/me", data);

const useUpdateUserProfile = () => {
  const { mutateAsync: updateUserProfileAsync } = useMutation({
    mutationFn: updateUserProfile,
    onError: (error) => {
      console.log("update user profile 에러", error);
    },
  });
  return { updateUserProfileAsync };
};
export default useUpdateUserProfile;
