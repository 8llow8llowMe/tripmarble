import { apiClient } from "@/shared/lib/api/client";
import { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface GameListResponse {
  contents: {
    tripGameId: number;
    gameStatus: "WAITING" | "ONGOING" | "ENDED";
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
  }[];
}

// 나의 게임 목록 조회
export const fetchMyGameList = () => apiClient.get("/trip-games");

const useMyGameList = () => {
  const { data, isLoading, isError, isSuccess } = useQuery<
    AxiosResponse<ApiResponse<GameListResponse>, Error>
  >({
    queryKey: ["myGameList"],
    queryFn: fetchMyGameList,
  });
  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useMyGameList;
