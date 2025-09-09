import { apiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";
import type { MoveLogBody } from "./useMoveLogSuccess";

export interface MoveLogSkipResponse {
  dataHeader: {
    success: boolean;
    resultCode: string | null;
    resultMessage: string | null;
  };
  dataBody: MoveLogBody;
}

export const postMoveLogSkip = async (
  tripGameId: string,
  tripGameMoveLogId: string
) => {
  const { data } = await apiClient.post<MoveLogSkipResponse>(
    `/trip-games/${tripGameId}/move-logs/${tripGameMoveLogId}/skip`
  );
  return data;
};

const useMoveLogSkip = () =>
  useMutation({
    mutationFn: ({
      tripGameId,
      tripGameMoveLogId,
    }: {
      tripGameId: string;
      tripGameMoveLogId: string;
    }) => postMoveLogSkip(tripGameId, tripGameMoveLogId),
  });

export default useMoveLogSkip;
