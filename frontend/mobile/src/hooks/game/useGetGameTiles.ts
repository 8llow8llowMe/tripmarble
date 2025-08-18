import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/apis/axiosClient';
import { QUERY_KEY } from '@/constants/keys';

export interface TripGameView {
  tripGameId: bigint;
  gameStatus: string;
  gameStatusDescription: string;
  difficultyCode: string;
  difficultyDescription: string;
  startedAt: string;
  endedAt: string;
  representativeRegionName: string;
  tripThemeNames: string[];
  isHost: boolean;
  isReady: boolean;
}

export interface TripGameTileView {
  tripGameTileId: bigint;
  tripSpotId: number;
  stepNo: number;
  missionTypeCode: string;
  missionTypeDescription: string;
  tripSpotName: string;
}

export interface GetTileResponse extends ApiResponseBase {
  dataBody: {
    tripGameView: TripGameView;
    tripGameTileViews: TripGameTileView[];
  };
}
export const fetchGetGameTiles = async (tripGameId: bigint | string | number) => {
  const id = typeof tripGameId === 'bigint' ? tripGameId.toString() : String(tripGameId);
  const { data } = await apiClient.get<GetTileResponse>(END_POINTS.GAME.TILES(id));
  return data;
};

const useGetGameTilesQuery = (
  tripGameId: bigint | string | number,
  enableApiCall: boolean = true,
) => {
  const idKey = typeof tripGameId === 'bigint' ? tripGameId.toString() : String(tripGameId);
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryFn: () => fetchGetGameTiles(tripGameId),
    queryKey: [QUERY_KEY.GAME.GET_GAME_TILES, idKey],
    enabled: enableApiCall ?? true,
  });

  return {
    gameInfo: data?.dataBody,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
};

export default useGetGameTilesQuery;
