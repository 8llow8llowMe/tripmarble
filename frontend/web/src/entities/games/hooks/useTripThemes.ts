import { apiClient } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";

// 여행 테마 목록 조회
export const fetchTripThemes = () => apiClient.get("/trip-themes");

const useTripThemes = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["tripThemes"],
    queryFn: fetchTripThemes,
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useTripThemes;
