import { apiClient } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";

// 여행 게임(계획) 난이도 목록 조회
export const fetchTripGameDifficulties = () =>
  apiClient.get("/trip-games/difficulties");

const useTripGameDifficulties = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["tripGameDifficulties"],
    queryFn: fetchTripGameDifficulties,
  });
  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useTripGameDifficulties;
