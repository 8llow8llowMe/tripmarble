import { authApiClient } from "@/shared/lib/api/client";

export const getUserProfile = () => authApiClient.get("/members/me");

export const updateUserProfile = (data: any) =>
  authApiClient.patch("members/me", data);

export const signUp = (data: {
  email: string;
  password: string;
  name: string;
  nickname: string;
}) => {
  return authApiClient.post("/members/signup", data);
};

export const uploadTempProfileImage = (imageFile: File) => {
  const formData = new FormData();
  formData.append("imageFile", imageFile);

  return authApiClient.post("/members/profile-image/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// export const deleteUserAccount = () => authApiClient.delete("/users/me");

export const login = (credentials: { email: string; password: string }) =>
  authApiClient.post("/auth/login", credentials);

export const logout = () => authApiClient.post("/auth/logout");
