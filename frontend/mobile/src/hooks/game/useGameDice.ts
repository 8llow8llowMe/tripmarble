import { apiClient } from '@/apis/axiosClient';
import type { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { useMutation } from '@tanstack/react-query';

export type MissionTypeCode = 'PHOTO' | 'REVIEW' | 'CHECKIN_GPS' | 'NONE';

export interface GameDiceResponse extends ApiResponseBase {
  dataBody: {
    tripGameMoveLogId: string;
    diceValue: number;
    newStepNo: number;
    isGameEnded: boolean;
    landedTileId: string;
    missionTypeCode: MissionTypeCode;
    missionTypeDescription: string;
  };
}

export const fetchGameDice = async (tripGameId: string) => {
  const { data } = await apiClient.post<GameDiceResponse>(END_POINTS.GAME.DICE(tripGameId));
  return data;
};

/**
 * 주사위 굴리기 훅 (POST)
 * 사용 예)
 * const { mutateAsync: rollDice, isPending } = useGameDiceMutation();
 * const res = await rollDice(tripGameId);
 */
const useGameDiceMutation = () => {
  return useMutation({
    mutationFn: (tripGameId: string) => fetchGameDice(tripGameId),
  });
};

export default useGameDiceMutation;
