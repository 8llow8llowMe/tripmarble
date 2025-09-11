import { apiClient } from '@/apis/axiosClient';
import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useMutation } from '@tanstack/react-query';

// === 타입 ===
export interface MoveLogBody {
  tripGameMoveLogId: string;
  tripGameTileId: string;
  tripGameMemberId: string;
  arrivedAt: string; // ISO datetime
  diceValue: number;
  turnOrder: number;
  missionResultCode: 'SUCCESS' | 'FAIL' | 'PENDING' | string;
  missionResultDescription: string;
  missionProcessedAt: string | null;
}

export interface MoveLogSuccessResponse extends ApiResponseBase {
  dataBody: MoveLogBody;
}

// === API 호출 ===
// 미션 성공 처리 (POST /trip-games/{tripGameId}/move-logs/{tripGameMoveLogId}/success)
export const postMoveLogSuccess = async (tripGameId: string, tripGameMoveLogId: string) => {
  const { data } = await apiClient.post<MoveLogSuccessResponse>(
    END_POINTS.GAME.MOVE_LOGS_SUCCESS(tripGameId, tripGameMoveLogId),
  );
  return data;
};

// === Mutation 훅 ===
// 사용 예)
// const { mutateAsync: markMissionSuccess, isPending } = useMoveLogsSuccessMutation();
// await markMissionSuccess({ tripGameId, tripGameMoveLogId });
export const useMoveLogsSuccessMutation = () =>
  useMutation({
    mutationFn: ({
      tripGameId,
      tripGameMoveLogId,
    }: {
      tripGameId: string;
      tripGameMoveLogId: string;
    }) => postMoveLogSuccess(tripGameId, tripGameMoveLogId),
  });

export default useMoveLogsSuccessMutation;
