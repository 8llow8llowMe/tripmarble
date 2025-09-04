import { apiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";

export type MissionTypeCode = "PHOTO" | "REVIEW" | "CHECKIN_GPS" | "NONE";

export interface GameDiceResponse {
  dataHeader: {
    success: boolean;
    resultCode: string | null;
    resultMessage: Record<string, string> | string | null;
  };
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
  const { data } = await apiClient.post<GameDiceResponse>(
    `/trip-games/${tripGameId}/dice`
  );
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
