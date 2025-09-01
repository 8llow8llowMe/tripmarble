import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/apis/axiosClient';
import { QUERY_KEY } from '@/constants/keys';

/**
 * 게임 강제 종료 응답 타입 (/trip-games/{tripGameId}/force-end)
 */
export interface GameForceEndResponse extends ApiResponseBase {
  dataBody: {
    tripGameId: string;
    gameStatusCode: 'ENDED';
    gameStatusDescription: string; // e.g. '게임 종료됨'
    endTypeCode: 'NORMAL' | 'FORCE';
    endTypeDescription: string; // e.g. '정상 종료' | '강제 종료'
  };
}

/**
 * 게임 강제 종료 API 호출 함수
 */
export const forceEndGame = async (tripGameId: string) => {
  const { data } = await apiClient.post<GameForceEndResponse>(
    END_POINTS.GAME.FORCE_END(tripGameId),
  );
  return data;
};

/**
 * 게임 강제 종료 훅 (mutation)
 * 사용 예:
 *
 * const { mutate: endGame, isPending } = useGameEndMutation();
 *
 * endGame(tripGameId, { onSuccess: (res) => { ... } });
 */
const useGameEndMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEY.GAME.GAME_FORCE_END],
    mutationFn: (tripGameId: string) => forceEndGame(tripGameId),
  });
};

export default useGameEndMutation;
