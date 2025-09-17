
import { apiClient } from "@/shared/lib/api/client";
import { dataHeader } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export interface TripSpotReviewTempPhoto {
  tempPhotoUrl: string;
}

export interface UploadTripSpotReviewPhotosResponse {
  dataHeader: dataHeader;
  dataBody: TripSpotReviewTempPhoto[];
}

export interface UploadTripSpotReviewPhotosParams {
  files: File[] | FileList;
}

export const uploadTripSpotReviewPhotos = (
  tripSpotId: string,
  files: File[]
): Promise<AxiosResponse<UploadTripSpotReviewPhotosResponse>> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("imageFiles", file);
  });

  return apiClient.post<UploadTripSpotReviewPhotosResponse>(
    `/trip-spots/${tripSpotId}/reviews/photos/temp`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

const normalizeFiles = (input: File[] | FileList): File[] => {
  if (Array.isArray(input)) {
    return input;
  }
  return Array.from(input);
};

const useUploadTripSpotReviewPhotos = (tripSpotId: string) =>
  useMutation<
    AxiosResponse<UploadTripSpotReviewPhotosResponse>,
    Error,
    UploadTripSpotReviewPhotosParams
  >({
    mutationKey: ["uploadTripSpotReviewPhotos", tripSpotId],
    mutationFn: ({ files }) =>
      uploadTripSpotReviewPhotos(tripSpotId, normalizeFiles(files)),
  });

export default useUploadTripSpotReviewPhotos;
