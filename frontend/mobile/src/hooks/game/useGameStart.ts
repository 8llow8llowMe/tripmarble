import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/apis/axiosClient';
import { QUERY_KEY } from '@/constants/keys';

export interface GameStartResponse extends ApiResponseBase {
  dataBody: {
    tripGameId: string;
    gameStatusCode: string;
    gameStatusDescription: string;
    members: [
      {
        memberId: number;
        nickname: string;
        profileImage: string;
        turnOrder: number;
        isHost: boolean;
      },
    ];
  };
}
export const fetchGameStart = async (tripGameId: string) => {
  const { data } = await apiClient.post<GameStartResponse>(END_POINTS.GAME.START(tripGameId));
  return data;
};

const useGameStartQuery = (tripGameId: string) => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryFn: () => fetchGameStart(tripGameId),
    queryKey: [QUERY_KEY.GAME.GAME_START, tripGameId],
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
};

export default useGameStartQuery;
