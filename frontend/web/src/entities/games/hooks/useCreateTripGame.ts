// 게임 생성

import { apiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";

interface GameFormState {
  title: string;
  difficulty: "EASY" | "NORMAL" | "HARD";
  startedAt: string;
  endedAt: string;
  representativeRegionId: number | null;
  tripThemeIds: number[];
}

export const createTripGame = (data: GameFormState) =>
  apiClient.post("/trip-games", data);

const useCreateTripGame = () => {
  const { mutate: createGame } = useMutation({
    mutationFn: createTripGame,
    onError: (error) => {
      console.log("게임 생성 에러", error);
    },
  });

  return { createGame };
};

export default useCreateTripGame;
