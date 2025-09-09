import { apiClient } from "@/shared/lib/api/client";
import { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export interface GameMemberView {
  memberId: string;
  nickname: string;
  profileImageUrl: string | null;
  turnOrder: number;
  isHost: boolean;
}

export interface GameDetailResponse {
  tripGameId: string;
  representativeRegionImageUrl: string | null;
  representativeRegionName: string;
  tripThemeNames: string[];
  difficultyCode: "EASY" | "NORMAL" | "HARD";
  difficultyDescription: string;
  title: string;
  startedAt: string; // LocalDate ISO string
  endedAt: string; // LocalDate ISO string
  currentTurnOrder: number;
  currentStepNo: number;
  endTypeCode: string | null;
  endTypeDescription: string | null;
  members: GameMemberView[];
}

export const fetchGetGameDetail = (tripGameId: string) =>
  apiClient.get<ApiResponse<GameDetailResponse>>(`/trip-games/${tripGameId}`);

const useGetGameDetail = (tripGameId: string) => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery<
    AxiosResponse<ApiResponse<GameDetailResponse>, Error>
  >({
    queryKey: ["getGameDetail", tripGameId],
    queryFn: () => fetchGetGameDetail(tripGameId),
    enabled: Boolean(tripGameId),
  });

  return { data, isLoading, isError, isSuccess, refetch };
};

export default useGetGameDetail;
