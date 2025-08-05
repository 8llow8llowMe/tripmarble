import { authApiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";

export const uploadTempProfileImage = (imageFile: File) => {
  const formData = new FormData();
  formData.append("imageFile", imageFile);

  return authApiClient.post("/members/profile-image/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const useUploadTempProfileImage = () => {
  const { mutateAsync: uploadImageAsync } = useMutation({
    mutationFn: uploadTempProfileImage,
    onError: (error) => {
      console.log("uploadTempProfileImage 에러", error);
    },
  });
  return { uploadImageAsync };
};
export default useUploadTempProfileImage;
