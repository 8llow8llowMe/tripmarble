import { apiClient } from '@/apis/axiosClient';
import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { QUERY_KEY } from '@/constants/keys';
import { useQuery, useQueries, UseQueryResult } from '@tanstack/react-query';

export type GameStatus = 'WAITING' | 'ONGOING' | 'ENDED';

export interface GameSummary {
  tripGameId: number;
  gameStatus: GameStatus;
  gameStatusDescription: '게임 시작 전' | '게임 진행 중' | '게임 종료';
  difficultyCode: 'EASY' | 'NORMAL' | 'HARD';
  difficultyDescription: '쉬움' | '보통' | '어려움';
  representativeRegionImageUrl: string | null;
  representativeRegionName: string;
  title: string;
  startedAt: string;
  endedAt: string;
  tripThemeNames: string[];
  isHost: boolean;
  isReady: boolean;
}

export interface GameListResponse extends ApiResponseBase {
  data: {
    dataBody: {
      contents: GameSummary[];
    };
  };
}

export interface MyGameListParams {
  lastTripGameId?: number; // default 0
  size?: number; // default 10
  status?: GameStatus; // WAITING | ONGOING | ENDED
}

// 나의 게임 목록 조회 (상태별 파라미터 지원)
export const fetchMyGameList = (params?: { status?: GameStatus }) =>
  apiClient.get(END_POINTS.GAME.LIST_MY_GAMES, { params });

// 단일 상태 리스트 훅
export const useMyGameListQuery = (params?: { status?: GameStatus }) => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: () => fetchMyGameList(params),
    queryKey: [QUERY_KEY.GAME.MY_GAME_LIST, params?.status ?? 'ALL'],
  });
  return { myGameList: data, isLoading, isError, isSuccess };
};

// 상태 3종 병렬 조회 훅 (WAITING/ONGOING/ENDED)
export const useMyGameLists = (base?: Omit<MyGameListParams, 'status'>) => {
  const statuses: GameStatus[] = ['WAITING', 'ONGOING', 'ENDED'];
  const results = useQueries({
    queries: statuses.map((status) => ({
      queryKey: [QUERY_KEY.GAME.MY_GAME_LIST, status, base?.lastTripGameId ?? 0, base?.size ?? 10],
      queryFn: () => fetchMyGameList({ ...base, status }),
    })),
  }) as [
    UseQueryResult<GameListResponse>,
    UseQueryResult<GameListResponse>,
    UseQueryResult<GameListResponse>,
  ];

  const [waiting, ongoing, ended] = results;

  return {
    waiting,
    ongoing,
    ended,
    isLoading: waiting.isLoading || ongoing.isLoading || ended.isLoading,
    isError: waiting.isError || ongoing.isError || ended.isError,
    isSuccess: waiting.isSuccess && ongoing.isSuccess && ended.isSuccess,
  };
};

export default useMyGameListQuery;
