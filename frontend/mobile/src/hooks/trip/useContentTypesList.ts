import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/apis/axiosClient';
import { QUERY_KEY } from '@/constants/keys';

export interface ContentTypesListResponse extends ApiResponseBase {
  dataBody: {
    contentTypeId: number;
    contentTypeName: string;
  }[];
}

export const getContentTypesList = async () => {
  const { data } = await apiClient.get<ContentTypesListResponse>(
    END_POINTS.TRIP.LIST_CONTENT_TYPES,
  );

  return data;
};

const useContentTypesListQuery = () => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryFn: () => getContentTypesList(),
    queryKey: [QUERY_KEY.TRIP.LIST_CONTENT_TYPES],
  });

  return {
    contentTypesList: data?.dataBody,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
};

export default useContentTypesListQuery;
