import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/apis/axiosClient';
import { QUERY_KEY } from '@/constants/keys';

export interface TripGameView {
  tripGameId: string;
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
  tripGameTileId: string;
  tripSpotId: string;
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
export const fetchGetGameTiles = async (tripGameId: string) => {
  const { data } = await apiClient.get<GetTileResponse>(END_POINTS.GAME.TILES(tripGameId));
  return data;
};

const useGetGameTilesQuery = (tripGameId: string, enableApiCall: boolean = true) => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryFn: () => fetchGetGameTiles(tripGameId),
    queryKey: [QUERY_KEY.GAME.GET_GAME_TILES, tripGameId],
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
