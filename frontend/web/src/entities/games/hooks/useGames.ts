import {
  createTripGame,
  fetchTripThemes,
  fetchTripGameDifficulties,
} from "@/entities/games/api/games";
import { useMutation, useQuery } from "@tanstack/react-query";

// 게임 생성
export const useCreateTripGame = () =>
  useMutation({ mutationFn: createTripGame });

// 여행 테마 목록 조회 훅
export const useTripThemes = () =>
  useQuery({
    queryKey: ["tripThemes"],
    queryFn: fetchTripThemes,
  });

// 난이도 목록 조회 훅
export const useTripGameDifficulties = () =>
  useQuery({
    queryKey: ["tripGameDifficulties"],
    queryFn: fetchTripGameDifficulties,
  });
