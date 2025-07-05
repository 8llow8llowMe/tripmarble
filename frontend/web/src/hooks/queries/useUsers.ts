import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  login,
  logout,
} from "@/apis/users";

export const useUserProfile = () =>
  useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

export const useUpdateUserProfile = () =>
  useMutation({
    mutationFn: updateUserProfile,
  });

export const useDeleteUserAccount = () =>
  useMutation({
    mutationFn: deleteUserAccount,
  });

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });

export const useLogout = () =>
  useMutation({
    mutationFn: logout,
  });
