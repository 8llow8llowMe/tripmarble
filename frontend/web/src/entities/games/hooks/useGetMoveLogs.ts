import { apiClient } from "@/shared/lib/api/client";
import { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export interface GameMoveLog {
  tripGameMoveLogId: string;
  tripGameTileId: string;
  tripGameMemberId: string;
  arrivedAt: string;
  diceValueAtRoll: number;
  turnOrderAtRoll: number;
  missionResultCode: string;
  missionResultDescription: string;
  missionProcessedAt: string | null;
}

export const fetchGetMoveLogs = (tripGameId: string) =>
  apiClient.get<ApiResponse<GameMoveLog[]>>(
    `/trip-games/${tripGameId}/move-logs`
  );

const useGetMoveLogs = (tripGameId: string) => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery<
    AxiosResponse<ApiResponse<GameMoveLog[]>, Error>
  >({
    queryKey: ["getMoveLogs", tripGameId],
    queryFn: () => fetchGetMoveLogs(tripGameId),
    enabled: Boolean(tripGameId),
  });

  return { data, isLoading, isError, isSuccess, refetch };
};

export default useGetMoveLogs;

