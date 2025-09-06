import { apiClient } from '@/apis/axiosClient';
import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { QUERY_KEY } from '@/constants/keys';
import { useQuery } from '@tanstack/react-query';

export interface Member {
  memberId: string;
  nickname: string;
  profileImageUrl: string | null;
  turnOrder: number;
  isHost: boolean;
}

export interface GameDetail {
  tripGameId: string;
  representativeRegionImageUrl: string | null;
  representativeRegionName: string;
  tripThemeNames: string[];
  difficultyCode: 'EASY' | 'NORMAL' | 'HARD';
  difficultyDescription: '쉬움' | '보통' | '어려움';
  title: string;
  startedAt: string;
  endedAt: string;
  currentTurnOrder: number;
  currentStepNo: number;
  endTypeCode: string;
  endTypeDescription: string;
  members: Member[];
}

export interface GameListResponse extends ApiResponseBase {
  data: {
    dataBody: GameDetail;
  };
}

export interface MyGameListParams {
  lastTripGameId?: string;
  size?: number; // default 10
  status?: string; // status type removed or generalized
}

// 게임 상세 조회
export const fetchGameDetail = async (tripGameId: string) => {
  const { data } = await apiClient.get(END_POINTS.GAME.DETAIL(tripGameId));
  return data;
};

// 단일 상태 리스트 훅
export const useGameDetailQuery = (tripGameId: string) => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: () => fetchGameDetail(tripGameId),
    queryKey: [QUERY_KEY.GAME.GAME_DETAIL_INFO],
  });
  return { gameDetail: data, isLoading, isError, isSuccess };
};

export default useGameDetailQuery;
