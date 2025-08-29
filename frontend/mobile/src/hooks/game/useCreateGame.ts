import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { apiClient } from '@/apis/axiosClient';
import { useMutation } from '@tanstack/react-query';

export interface CreateGameRequest {
  title: string;
  difficulty: string;
  startedAt: string;
  endedAt: string;
  representativeRegionId: string;
  tripThemeIds: string[];
}

export interface CreateGameResponse extends ApiResponseBase {
  dataBody: {
    tripGameId: string;
    title: string; // not null(front에서 디폴트로 값 지정)
    gameStatus: string; // WAITING
    gameStatusDescription: string; // 시작 전
    difficultyCode: string; //NORMAL
    difficultyDescription: string; //보통
    startedAt: string; // 'YYYY-MM-DD'
    endedAt: string; //'YYYY-MM-DD'
    representativeRegionName: string;
    tripThemeNames: string[];
    isHost: boolean;
    isReady: boolean;
  };
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
  const { mutateAsync: createGame, isPending } = useMutation({
    mutationFn: postCreateGame,
    onError: (error) => {
      console.log('❌ 게임 생성 실패', error);
    },
  });

  return { createGame, isPending };
};

export default useCreateGameMutaion;
