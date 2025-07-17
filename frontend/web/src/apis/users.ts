import { authApiClient } from "@/apis/client";

export const getUserProfile = () => authApiClient.get("/users/me");

export const updateUserProfile = (data: any) =>
  authApiClient.put("/users/me", data);

export const deleteUserAccount = () => authApiClient.delete("/users/me");

export const login = (credentials: { email: string; password: string }) =>
  authApiClient.post("/auth/login", credentials);

export const logout = () => authApiClient.post("/auth/logout");

export const signUp = (data: {
  email: string;
  password: string;
  name: string;
  nickname: string;
}) => {
  return authApiClient.post("/members/signup", data);
};
