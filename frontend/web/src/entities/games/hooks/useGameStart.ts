import { apiClient } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";

export interface GameStartResponse {
  dataBody: {
    tripGameId: number;
    gameStatusCode: string;
    gameStatusDescription: string;
    members: [
      {
        memberId: number;
        nickname: string;
        profileImage: string;
        turnOrder: number;
        isHost: boolean;
      }
    ];
  };
}
export const fetchGameStart = async (tripGameId: bigint | string | number) => {
  const id =
    typeof tripGameId === "bigint" ? tripGameId.toString() : String(tripGameId);
  const { data } = await apiClient.post<GameStartResponse>(
    `/trip-games/${tripGameId}/start`
  );
  return data;
};

const useGameStartQuery = (tripGameId: bigint | string | number) => {
  const idKey =
    typeof tripGameId === "bigint" ? tripGameId.toString() : String(tripGameId);
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["gameStart", idKey],
    queryFn: () => fetchGameStart(tripGameId),
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
};

export default useGameStartQuery;
