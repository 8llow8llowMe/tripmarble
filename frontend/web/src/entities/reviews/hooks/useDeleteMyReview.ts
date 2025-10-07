"use client";

import { apiClient } from "@/shared/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const deleteMyReview = (tripSpotReviewId: string) =>
  apiClient.delete(`/me/reviews/${tripSpotReviewId}`);

const useDeleteMyReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyReview,
    onSuccess: (_, reviewId) => {
      void queryClient.invalidateQueries({ queryKey: ["myReviews"] });
      void queryClient.invalidateQueries({ queryKey: ["myReviewsInfinite"] });
      toast.success("리뷰를 삭제했어요.");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.dataHeader?.resultMessage ||
        "리뷰 삭제에 실패했어요.";
      toast.error(message);
    },
  });
};

export default useDeleteMyReview;
