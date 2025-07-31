import {
  createTripGame,
  fetchTripThemes,
  fetchTripGameDifficulties,
} from "@/entities/games/api/games";
import { TripThemesResponse } from "@/entities/games/model/gamesType";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

// 게임 생성
export const useCreateTripGame = () =>
  useMutation({ mutationFn: createTripGame });

// 여행 테마 목록 조회 훅
export const useTripThemes = () =>
  useQuery<AxiosResponse<ApiResponse<TripThemesResponse[]>, Error>>({
    queryKey: ["tripThemes"],
    queryFn: fetchTripThemes,
  });

// 난이도 목록 조회 훅
export const useTripGameDifficulties = () =>
  useQuery({
    queryKey: ["tripGameDifficulties"],
    queryFn: fetchTripGameDifficulties,
  });
