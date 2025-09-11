import { apiClient } from "@/shared/lib/api/client";
import { ApiResponse } from "@/shared/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { GameStatus, GameSummary } from "./useMyGameList";

export interface GameListPageResponse {
  contents: GameSummary[];
  hasNext: boolean;
}

export const getGameListInfinite = (
  params: {
    status?: GameStatus;
    lastTripGameId?: string | null;
    size?: number;
  } = {}
): Promise<AxiosResponse<ApiResponse<GameListPageResponse>>> => {
  const search = new URLSearchParams();
  if (params.status) search.append("status", params.status);
  if (params.lastTripGameId)
    search.append("lastTripGameId", params.lastTripGameId);
  if (params.size) search.append("size", String(params.size));
  const qs = search.toString();
  const url = `/trip-games${qs ? `?${qs}` : ""}`;
  return apiClient.get(url);
};

const useGameListInfinite = (params?: {
  status?: GameStatus;
  size?: number;
}) => {
  const status = params?.status;
  const size = params?.size ?? 10;
  const isBrowser = typeof window !== "undefined";

  return useInfiniteQuery<
    AxiosResponse<ApiResponse<GameListPageResponse>>,
    Error
  >({
    queryKey: ["myGameListInfinite", status ?? "ALL", size],
    queryFn: ({ pageParam }) =>
      getGameListInfinite({
        status,
        size,
        lastTripGameId: (pageParam ?? null) as string | null,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      const body = lastPage.data.dataBody;
      const contents = body.contents ?? [];
      const hasNext = Boolean(body.hasNext);
      if (!hasNext || contents.length === 0) return undefined;
      return contents[contents.length - 1].tripGameId;
    },
    enabled: true,
  });
};

export default useGameListInfinite;
