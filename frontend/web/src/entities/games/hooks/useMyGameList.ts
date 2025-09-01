import { apiClient } from "@/shared/lib/api/client";
import { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export type GameStatus = "WAITING" | "ONGOING" | "ENDED";
export interface GameSummary {
  tripGameId: string;
  gameStatus: GameStatus;
  gameStatusDescription: "게임 시작 전" | "게임 진행 중" | "게임 종료";
  difficultyCode: "EASY" | "NORMAL" | "HARD";
  difficultyDescription: "쉬움" | "보통" | "어려움";
  representativeRegionImageUrl: string | null;
  representativeRegionName: string;
  title: string;
  startedAt: string;
  endedAt: string;
  tripThemeNames: string[];
  isHost: boolean;
  isReady: boolean;
}

export interface GameListResponse {
  contents: GameSummary[];
}

// 나의 게임 목록 조회
export const fetchMyGameList = (params?: { status?: GameStatus }) =>
  apiClient.get("/trip-games", { params });

const useMyGameList = (params?: { status?: GameStatus }) => {
  const status = params?.status;
  const isValidStatus =
    status === "WAITING" || status === "ONGOING" || status === "ENDED";

  const { data, isLoading, isError, isSuccess } = useQuery<
    AxiosResponse<ApiResponse<GameListResponse>, Error>
  >({
    queryKey: ["myGameList", isValidStatus ? status : "ALL"],
    queryFn: () =>
      isValidStatus ? fetchMyGameList({ status }) : fetchMyGameList(),
  });
  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useMyGameList;
