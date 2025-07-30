import { GameFormState } from "@/features/game/create-game/model/createGameSlice";
import { apiClient } from "@/shared/lib/api/client";

// 여행 게임 생성
export const createTripGame = (data: GameFormState) =>
  apiClient.post("/trip-games", data);
