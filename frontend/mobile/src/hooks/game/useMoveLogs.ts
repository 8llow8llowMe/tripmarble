import { apiClient } from '@/apis/axiosClient';
import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { QUERY_KEY } from '@/constants/keys';
import { useQuery } from '@tanstack/react-query';

export interface GameMoveLog {
  tripGameMoveLogId: string;
  tripGameTileId: string;
  tripGameMemberId: string;
  arrivedAt: string;
  diceValueAtRoll: number;
  turnOrderAtRoll: number;
  missionResultCode: string;
  missionResultDescription: string;
  missionProcessedAt: string;
}

export interface GameListResponse extends ApiResponseBase {
  data: {
    dataBody: GameMoveLog[];
  };
}

export interface MyGameListParams {
  lastTripGameId?: string;
  size?: number; // default 10
  status?: string; // status type removed or generalized
}

// 게임 상세 조회
export const fetchMoveLogs = async (tripGameId: string) => {
  const { data } = await apiClient.get(END_POINTS.GAME.MOVE_LOGS(tripGameId));
  return data;
};

// 단일 상태 리스트 훅
export const useMoveLogsSuccessQuery = (tripGameId: string) => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: () => fetchMoveLogs(tripGameId),
    queryKey: [QUERY_KEY.GAME.MOVE_LOGS],
  });
  return { moveLogs: data, isLoading, isError, isSuccess };
};

export default useMoveLogsSuccessQuery;
