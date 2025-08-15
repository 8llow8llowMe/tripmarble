import { apiClient } from "@/shared/lib/api/client";
import { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface GameTileResponse {
  tripGameTileId: number;
  tripSpotId: number;
  tripSpotName: string;
  stepNo: number;
  missionTypeCode: string;
  missionTypeDescription: string;
}

// 게임 타일 목록 조회
export const fetchGetGameTiles = (tripGameId: number) =>
  apiClient.get(`/trip-games/${tripGameId}/tiles`);

const useGetGameTiles = (tripGameId: number) => {
  const { data, isLoading, isError, isSuccess } = useQuery<
    AxiosResponse<ApiResponse<GameTileResponse[]>, Error>
  >({
    queryKey: ["getGameTiles", tripGameId],
    queryFn: () => fetchGetGameTiles(tripGameId),
  });
  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useGetGameTiles;
