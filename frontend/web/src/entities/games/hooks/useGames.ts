import { createTripGame } from "@/entities/games/api/games";
import { useMutation } from "@tanstack/react-query";

export const useCreateTripGame = () =>
  useMutation({ mutationFn: createTripGame });
