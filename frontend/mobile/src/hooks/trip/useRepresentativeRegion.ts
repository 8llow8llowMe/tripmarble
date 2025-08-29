import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/apis/axiosClient';
import { QUERY_KEY } from '@/constants/keys';

interface Props {
  representativeRegionId: string;
}

export interface RepresentativeRegionRequest {
  representativeRegionId: string;
}

export interface RepresentativeRegionResponse extends ApiResponseBase {
  dataBody: {
    representativeRegionId: string;
    representativeRegionName: string;
    imageUrl: string | null;
    description: string | null;
  };
}

export const getRepresentativeRegion = async ({
  representativeRegionId,
}: RepresentativeRegionRequest) => {
  const { data } = await apiClient.get<RepresentativeRegionResponse>(
    END_POINTS.TRIP.REPRESENTATIVE_REGION(representativeRegionId),
  );

  return data;
};

const useRepresentativeRegionQuery = ({ representativeRegionId }: Props) => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryFn: () => getRepresentativeRegion({ representativeRegionId }),
    queryKey: [QUERY_KEY.TRIP.REPRESENTATIVE_REGION, representativeRegionId],
    enabled: !!representativeRegionId,
  });

  return {
    representativeRegion: data,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
};

export default useRepresentativeRegionQuery;
