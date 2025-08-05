import { apiClient } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";

// 시도 목록 조회
export const getRegions = () => apiClient.get("/regions");

const useRegions = () => {
  const { data } = useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });
  return { data };
};

export default useRegions;
