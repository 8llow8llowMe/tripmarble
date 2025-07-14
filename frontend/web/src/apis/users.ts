import apiClient from "./client";

export const getUserProfile = () => apiClient.get("/users/me");

export const updateUserProfile = (data: any) =>
  apiClient.put("/users/me", data);

export const deleteUserAccount = () => apiClient.delete("/users/me");

export const login = (credentials: { email: string; password: string }) =>
  apiClient.post("/auth/login", credentials);

export const logout = () => apiClient.post("/auth/logout");

export const signUp = (data: {
  email: string;
  password: string;
  name: string;
  nickname: string;
}) => {
  return apiClient.post("/members/signup", data);
};
