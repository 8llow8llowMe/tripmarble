import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  login,
  logout,
  signUp,
  uploadTempProfileImage,
} from "@/entities/users/api/users";

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

export const useSignUp = () =>
  useMutation({
    mutationFn: signUp,
  });

export const useUploadTempProfileImage = () =>
  useMutation({
    mutationFn: uploadTempProfileImage,
  });
