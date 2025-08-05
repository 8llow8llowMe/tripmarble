import { apiClient } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";

// 여행 콘텐츠 타입 (관광 타입) 목록 조회
export const getTripContentTypes = () => apiClient.get("/trip-content-types");

const useTripContentTypes = () => {
  const { data } = useQuery({
    queryKey: ["tripContentTypes"],
    queryFn: getTripContentTypes,
  });
  return { data };
};

export default useTripContentTypes;
