import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { authApiClient } from '@/apis/axiosClient';
import { useMutation } from '@tanstack/react-query';
import { removeAsyncStorageItem } from '@/utils/asyncStorage';
import { STORAGE_KEY } from '@/constants/keys';
import { store } from '@/store/store';
import { logout as logoutAction } from '@/store/redux/auth/auth';

export interface LogoutResponse extends ApiResponseBase {
  dataBody: {};
}

export const postLogout = async () => {
  const { data } = await authApiClient.post<LogoutResponse>(END_POINTS.LOGOUT);

  return data;
};

const useLogoutMutation = () => {
  const { mutate: logout, isPending } = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      removeAsyncStorageItem(STORAGE_KEY.ACCESS_TOKEN);
      removeAsyncStorageItem(STORAGE_KEY.MEMBER_ID);
      store.dispatch(logoutAction());
    },
    onError: (error) => {
      console.log('로그아웃 에러', error);
    },
  });

  return { logout, isPending };
};

export default useLogoutMutation;
