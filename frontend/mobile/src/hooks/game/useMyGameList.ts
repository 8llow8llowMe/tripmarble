import { apiClient } from '@/apis/axiosClient';
import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { QUERY_KEY } from '@/constants/keys';
import { useQuery } from '@tanstack/react-query';

export interface GameListResponse extends ApiResponseBase {
  dataBody: {
    contents: {
      tripGameId: number;
      gameStatus: 'WAITING' | 'ONGOING' | 'ENDED';
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
    }[];
  };
}
// 나의 게임 목록 조회
export const fetchMyGameList = async () =>
  await apiClient.get<GameListResponse>(END_POINTS.GAME.LIST_MY_GAMES);

const useMyGameListQuery = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: fetchMyGameList,
    queryKey: [QUERY_KEY.GAME.MY_GAME_LIST],
  });
  return {
    myGameList: data,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useMyGameListQuery;
