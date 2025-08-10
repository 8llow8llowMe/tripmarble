import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/apis/axiosClient';
import { QUERY_KEY } from '@/constants/keys';

export interface TripThemesListResponse extends ApiResponseBase {
  dataBody: {
    tripThemeId: number;
    tripThemeName: string;
  }[];
}

export const getTripThemesList = async () => {
  const { data } = await apiClient.get<TripThemesListResponse>(END_POINTS.GAME.LIST_TRIP_THEMES);

  return data;
};

const useTripThemesListQuery = () => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryFn: () => getTripThemesList(),
    queryKey: [QUERY_KEY.GAME.LIST_TRIP_THEMES],
  });

  return {
    tripThemesList: data?.dataBody,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
};

export default useTripThemesListQuery;
