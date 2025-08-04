import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/apis/axiosClient';
import { QUERY_KEY } from '@/constants/keys';

export interface RepresentativeRegionsListResponse extends ApiResponseBase {
  dataBody: {
    representativeRegionId: number;
    representativeRegionName: string;
    imageUrl: string | null;
  }[];
}

export const getRepresentativeRegionsList = async () => {
  const { data } = await apiClient.get<RepresentativeRegionsListResponse>(
    END_POINTS.TRIP.LIST_REPRESENTATIVE_REGIONS,
  );

  return data;
};

const useRepresentativeRegionsListQuery = () => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryFn: () => getRepresentativeRegionsList(),
    queryKey: [QUERY_KEY.TRIP.LIST_REPRESENTATIVE_REGIONS],
  });

  return {
    representativeRegionsList: data?.dataBody,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
};

export default useRepresentativeRegionsListQuery;
