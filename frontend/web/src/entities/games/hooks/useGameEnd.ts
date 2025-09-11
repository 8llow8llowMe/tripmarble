import { apiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";

export interface GameForceEndResponse {
  dataHeader: {
    success: boolean;
    resultCode: string | null;
    resultMessage: string | null;
  };
  dataBody: {
    tripGameId: string;
    gameStatusCode: "ENDED";
    gameStatusDescription: string;
    endTypeCode: "NORMAL" | "FORCE";
    endTypeDescription: string;
  };
}

export const forceEndGame = async (tripGameId: string) => {
  const { data } = await apiClient.post<GameForceEndResponse>(
    `/trip-games/${tripGameId}/force-end`
  );
  return data;
};

const useGameEndMutation = () => {
  return useMutation({
    mutationFn: (tripGameId: string) => forceEndGame(tripGameId),
  });
};

export default useGameEndMutation;
