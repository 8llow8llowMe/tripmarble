import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/apis/axiosClient';
import { QUERY_KEY } from '@/constants/keys';

interface Props {
  keyword: string;
}

export interface SearchRepresentativeRegionRequest {
  keyword: string;
}

export interface SearchRepresentativeRegionResponse extends ApiResponseBase {
  dataBody: Array<{
    representativeRegionId: string;
    representativeRegionName: string;
  }>;
}

export const getSearchRepresentativeRegion = async ({
  keyword,
}: SearchRepresentativeRegionRequest) => {
  const { data } = await apiClient.get<SearchRepresentativeRegionResponse>(
    END_POINTS.TRIP.SEARCH_REPRESENTATIVE_REGION,
    { params: { keyword } },
  );
  return data;
};

const useSearchRepresentativeRegionQuery = ({ keyword }: Props) => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryFn: () => getSearchRepresentativeRegion({ keyword }),
    queryKey: [QUERY_KEY.TRIP.SEARCH_REPRESENTATIVE_REGION, keyword],
    enabled: keyword.trim().length > 0,
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
};

export default useSearchRepresentativeRegionQuery;
