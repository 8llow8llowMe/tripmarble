import { apiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";
import type { MoveLogBody } from "./useMoveLogSuccess";

export interface MoveLogFailResponse {
  dataHeader: {
    success: boolean;
    resultCode: string | null;
    resultMessage: string | null;
  };
  dataBody: MoveLogBody;
}

export const postMoveLogFail = async (
  tripGameId: string,
  tripGameMoveLogId: string
) => {
  const { data } = await apiClient.post<MoveLogFailResponse>(
    `/trip-games/${tripGameId}/move-logs/${tripGameMoveLogId}/fail`
  );
  return data;
};

const useMoveLogFail = () =>
  useMutation({
    mutationFn: ({
      tripGameId,
      tripGameMoveLogId,
    }: {
      tripGameId: string;
      tripGameMoveLogId: string;
    }) => postMoveLogFail(tripGameId, tripGameMoveLogId),
  });

export default useMoveLogFail;
