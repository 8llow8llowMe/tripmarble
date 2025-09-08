import { apiClient } from '@/apis/axiosClient';
import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { MoveLogBody } from '@/hooks/game/useMoveLogsSuccess';
import { useMutation } from '@tanstack/react-query';

// === 타입 (응답 바디 구조가 확정되지 않아 제네릭 베이스만 사용) ===
export interface MoveLogSkipResponse extends ApiResponseBase {
  dataBody: MoveLogBody;
}

// === API 호출 ===
// 미션 스킵 처리 (POST /trip-games/{tripGameId}/move-logs/{tripGameMoveLogId}/skip)
export const postMoveLogSkip = async (tripGameId: string, tripGameMoveLogId: string) => {
  const { data } = await apiClient.post<MoveLogSkipResponse>(
    END_POINTS.GAME.MOVE_LOGS_SKIP(tripGameId, tripGameMoveLogId),
  );
  return data;
};

// === Mutation 훅 ===
// 사용 예)
// const { mutateAsync: markMissionSkip, isPending } = useMoveLogsSkipMutation();
// await markMissionSkip({ tripGameId, tripGameMoveLogId });
export const useMoveLogsSkipMutation = () =>
  useMutation({
    mutationFn: ({
      tripGameId,
      tripGameMoveLogId,
    }: {
      tripGameId: string;
      tripGameMoveLogId: string;
    }) => postMoveLogSkip(tripGameId, tripGameMoveLogId),
  });

export default useMoveLogsSkipMutation;
