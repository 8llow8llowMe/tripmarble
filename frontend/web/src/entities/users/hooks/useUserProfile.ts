import { authApiClient } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";

export const getUserProfile = () => authApiClient.get("/members/me");

const useUserProfile = () => {
  const { data } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });
  return { data };
};

export default useUserProfile;
