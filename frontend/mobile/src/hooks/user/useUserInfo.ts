import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useQuery } from '@tanstack/react-query';
import { apiClient, authApiClient } from '@/apis/axiosClient';
import { UserType } from '@/types/user/user';
import { QUERY_KEY } from '@/constants/keys';

interface Props {
  memberId?: number;
  enableApiCall: boolean;
}

export interface UserInfoResponse extends ApiResponseBase {
  dataBody: UserType;
}

export const getUserInfo = async () => {
  const { data } = await apiClient.get<UserInfoResponse>(END_POINTS.USER.INFO);
  console.log(data);
  return data;
};

const useUserInfoQuery = ({ memberId, enableApiCall }: Props) => {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryFn: () => getUserInfo(),
    queryKey: [QUERY_KEY.USER.INFO, memberId],
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

export default useUserInfoQuery;
