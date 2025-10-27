import { ApiResponseBase } from '@/apis/base';
import { END_POINTS } from '@/constants/apis';
import { apiClient } from '@/apis/axiosClient';
import { useMutation } from '@tanstack/react-query';

export interface ReviewMissionRequest {
  tripGameId: string;
  tripGameMoveLogId: string;
  tripSpotId: string;
  content: string;
  rating: number;
  photoUrls: string[];
}

export interface ReviewMissionResponse extends ApiResponseBase {
  dataBody: {
    tripGameMoveLogId: string;
    tripGameTileId: string;
    tripGameMemberId: string;
    diceValue: number;
    turnOrder: number;
    arrivedAt: string;
    missionResultCode: string; //'SUCCESS' |
    missionResultDescription: string; // '성공' |
    missionProcessedAt: string; // '2025-08-27T14:35:01';
    missionReferenceId: string; //'99887766';
  };
}

export const postReviewMission = async ({
  tripGameId,
  tripGameMoveLogId,
  tripSpotId,
  content,
  rating,
  photoUrls,
}: ReviewMissionRequest) => {
  const { data } = await apiClient.post<ReviewMissionResponse>(
    END_POINTS.GAME.MISSON_REVIEW(tripGameId, tripGameMoveLogId),
    {
      tripSpotId,
      content,
      rating,
      photoUrls,
    },
  );

  return data;
};

const useReviewMissionMutaion = () => {
  const { mutateAsync: submitReview, isPending } = useMutation({
    mutationFn: postReviewMission,
    onError: (error: any) => {
      console.log(error.config);
      console.log('❌ 게임 미션 리뷰 등록 실패', error);
    },
  });

  return { submitReview, isPending };
};

export default useReviewMissionMutaion;
