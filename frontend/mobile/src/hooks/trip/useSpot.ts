import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/apis/axiosClient';
import { QUERY_KEY } from '@/constants/keys';

interface Props {
  tripSpotId: string;
}

export interface TripSpotRequest {
  tripSpotId: string;
}

export interface TripSpotResponse extends ApiResponseBase {
  dataBody: {
    tripSpotId: string;
    tripSpotName: string;
    contentTypeName: string;
    description: string | null;
    homepageUrl: string | null;
    phoneNumber: string | null;
    address: string | null;
    addressDetail: string | null;
    longitude: number;
    latitude: number;
    originalImageUrl: string | null;
  };
}

export const getTripSpot = async ({ tripSpotId }: TripSpotRequest) => {
  const { data } = await apiClient.get<TripSpotResponse>(END_POINTS.TRIP.SPOT(tripSpotId));

  return data;
};

const useTripSpotQuery = ({ tripSpotId }: Props) => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryFn: () => getTripSpot({ tripSpotId }),
    queryKey: [QUERY_KEY.TRIP.SPOT, tripSpotId],
    enabled: !!tripSpotId,
  });

  return {
    tripSpot: data,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
};

export default useTripSpotQuery;
