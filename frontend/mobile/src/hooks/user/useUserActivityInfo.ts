import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import { authApiClient } from '@/apis/axiosClient';
import { UserActivityType } from '@/types/user/user';
import { QUERY_KEY } from '@/constants/keys';

interface Props {
  memberId?: number;
  enableApiCall: boolean;
}

export interface UserActivityInfoResponse extends ApiResponseBase {
  dataBody: UserActivityType;
}

export const getUserActivityInfo = async () => {
  const { data } = await authApiClient.get<UserActivityInfoResponse>(END_POINTS.USER.ACTIVITY_INFO);

  return data;
};

const useUserActivityInfoQuery = ({ memberId, enableApiCall }: Props) => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryFn: () => getUserActivityInfo(),
    queryKey: [QUERY_KEY.USER.ACTIVITY_INFO, memberId],
    enabled: !!memberId && enableApiCall,
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
};

export default useUserActivityInfoQuery;
