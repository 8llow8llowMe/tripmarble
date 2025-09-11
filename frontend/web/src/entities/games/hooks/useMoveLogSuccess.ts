import { apiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";

export interface MoveLogBody {
  tripGameMoveLogId: string;
  tripGameTileId: string;
  tripGameMemberId: string;
  arrivedAt: string; // ISO datetime
  diceValue: number;
  turnOrder: number;
  missionResultCode: "SUCCESS" | "FAIL" | "PENDING" | string;
  missionResultDescription: string;
  missionProcessedAt: string | null;
}

export interface MoveLogSuccessResponse {
  dataHeader: {
    success: boolean;
    resultCode: string | null;
    resultMessage: string | null;
  };
  dataBody: MoveLogBody;
}

export const postMoveLogSuccess = async (
  tripGameId: string,
  tripGameMoveLogId: string
) => {
  const { data } = await apiClient.post<MoveLogSuccessResponse>(
    `/trip-games/${tripGameId}/move-logs/${tripGameMoveLogId}/success`
  );
  return data;
};

const useMoveLogSuccess = () =>
  useMutation({
    mutationFn: ({
      tripGameId,
      tripGameMoveLogId,
    }: {
      tripGameId: string;
      tripGameMoveLogId: string;
    }) => postMoveLogSuccess(tripGameId, tripGameMoveLogId),
  });

export default useMoveLogSuccess;
