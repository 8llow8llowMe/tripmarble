import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/apis/axiosClient';
import { QUERY_KEY } from '@/constants/keys';

export interface DifficultyListResponse extends ApiResponseBase {
  dataBody: {
    code: string;
    description: string;
  }[];
}

export const getDifficultyList = async () => {
  const { data } = await apiClient.get<DifficultyListResponse>(END_POINTS.GAME.LIST_DIFFICULTY);

  return data;
};

const useDifficultyListQuery = () => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryFn: () => getDifficultyList(),
    queryKey: [QUERY_KEY.GAME.LIST_DIFFICULTY],
  });

  return {
    difficultyList: data?.dataBody,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
};

export default useDifficultyListQuery;
