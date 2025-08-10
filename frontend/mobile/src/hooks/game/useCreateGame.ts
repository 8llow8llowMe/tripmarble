import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { apiClient } from '@/apis/axiosClient';
import { useMutation } from '@tanstack/react-query';

export interface CreateGameRequest {
  title: string;
  difficulty: string;
  startedAt: string;
  endedAt: string;
  representativeRegionId: number;
  tripThemeIds: number[];
}

export interface CreateGameResponse extends ApiResponseBase {
  dataBody: {};
}

export const postCreateGame = async ({
  title,
  difficulty,
  startedAt,
  endedAt,
  representativeRegionId,
  tripThemeIds,
}: CreateGameRequest) => {
  const { data } = await apiClient.post<CreateGameResponse>(END_POINTS.GAME.CREATE, {
    title,
    difficulty,
    startedAt,
    endedAt,
    representativeRegionId,
    tripThemeIds,
  });

  return data;
};

const useCreateGameMutaion = () => {
  const { mutate: createGame, isPending } = useMutation({
    mutationFn: postCreateGame,
    onError: (error) => {
      console.log('❌ 게임 생성 실패', error);
    },
  });

  return { createGame, isPending };
};

export default useCreateGameMutaion;
