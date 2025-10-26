import { apiClient } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";

// 여행지 상세 정보 조회
export const getTripSpotById = (tripSpotId: string) =>
  apiClient.get(`/trip-spots/${tripSpotId}`);

const useTripSpotById = (tripSpotId?: string) => {
  const query = useQuery({
    queryKey: ["tripSpotId", tripSpotId],
    queryFn: () => getTripSpotById(String(tripSpotId)),
    enabled: !!tripSpotId,
  });

  return {
    data: query.data,
    isLoading: query.isLoading && !!tripSpotId,
    isError: query.isError,
  };
};

export default useTripSpotById;
