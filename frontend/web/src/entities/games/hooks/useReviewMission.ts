import { apiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";

export interface ReviewMissionPayload {
  tripGameId: string;
  tripGameMoveLogId: string;
  tripSpotId: string;
  rating: number;
  content: string;
  photoUrls?: string[];
}

export interface MissionResultResponse {
  dataHeader: {
    success: boolean;
    resultCode: string | null;
    resultMessage: string | null;
  };
  dataBody: {
    missionResultCode: string;
    missionResultDescription: string;
    missionProcessedAt: string | null;
    missionReferenceId: string | null;
  };
}

export const postReviewMission = async (payload: ReviewMissionPayload) => {
  const { tripGameId, tripGameMoveLogId, tripSpotId, rating, content } = payload;
  const photoUrls = payload.photoUrls ?? [];
  const { data } = await apiClient.post<MissionResultResponse>(
    `/trip-games/${tripGameId}/move-logs/${tripGameMoveLogId}/review`,
    { tripSpotId, rating, content, photoUrls }
  );
  return data;
};

const useReviewMission = () =>
  useMutation({
    mutationFn: (payload: ReviewMissionPayload) => postReviewMission(payload),
  });

export default useReviewMission;

