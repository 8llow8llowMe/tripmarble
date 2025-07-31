import { GameFormState } from "@/features/game/create-game/model/createGameSlice";
import { apiClient } from "@/shared/lib/api/client";

// 여행 게임 생성
export const createTripGame = (data: GameFormState) =>
  apiClient.post("/trip-games", data);

// 여행 테마 목록 조회
export const fetchTripThemes = () => apiClient.get("/trip-themes");

// 여행 게임(계획) 난이도 목록 조회
export const fetchTripGameDifficulties = () =>
  apiClient.get("/trip-games/difficulties");
