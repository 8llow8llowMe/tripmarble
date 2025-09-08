import { apiClient } from '@/apis/axiosClient';
import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { MoveLogBody } from '@/hooks/game/useMoveLogsSuccess';
import { useMutation } from '@tanstack/react-query';

// === 타입 (응답 바디 구조가 확정되지 않아 제네릭 베이스만 사용) ===
export interface MoveLogFailResponse extends ApiResponseBase {
  // 서버 응답에 dataBody가 있다면 필요 시 확장하세요
  dataBody: MoveLogBody;
}

// === API 호출 ===
// 미션 실패 처리 (POST /trip-games/{tripGameId}/move-logs/{tripGameMoveLogId}/fail)
export const postMoveLogFail = async (tripGameId: string, tripGameMoveLogId: string) => {
  const { data } = await apiClient.post<MoveLogFailResponse>(
    END_POINTS.GAME.MOVE_LOGS_FAIL(tripGameId, tripGameMoveLogId),
  );
  return data;
};

// === Mutation 훅 ===
// 사용 예)
// const { mutateAsync: markMissionFail, isPending } = useMoveLogsFailMutation();
// await markMissionFail({ tripGameId, tripGameMoveLogId });
export const useMoveLogsFailMutation = () =>
  useMutation({
    mutationFn: ({
      tripGameId,
      tripGameMoveLogId,
    }: {
      tripGameId: string;
      tripGameMoveLogId: string;
    }) => postMoveLogFail(tripGameId, tripGameMoveLogId),
  });

export default useMoveLogsFailMutation;
