import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/apis/axiosClient';
import { QUERY_KEY } from '@/constants/keys';

export interface GameStartResponse extends ApiResponseBase {
  dataBody: {
    tripGameId: number;
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
export const fetchGameStart = async (tripGameId: bigint | string | number) => {
  const id = typeof tripGameId === 'bigint' ? tripGameId.toString() : String(tripGameId);
  const { data } = await apiClient.get<GameStartResponse>(END_POINTS.GAME.START(id));
  return data;
};

const useGameStartQuery = (tripGameId: bigint | string | number) => {
  const idKey = typeof tripGameId === 'bigint' ? tripGameId.toString() : String(tripGameId);
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryFn: () => fetchGameStart(tripGameId),
    queryKey: [QUERY_KEY.GAME.GAME_START, idKey],
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
