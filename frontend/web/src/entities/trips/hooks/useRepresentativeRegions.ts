import { apiClient } from "@/shared/lib/api/client";
import { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

// 대표 여행지 목록 전체 조회
export interface RegionsRepresentativeResponse {
  representativeRegionId: number;
  representativeRegionName: string;
  representativeRegionImageUrl: string | null;
  regionId: number | null;
  sigunguId: number | null;
}

// 대표 여행지 목록 전체 조회
export const getRepresentativeRegions = () =>
  apiClient.get("/regions/representative");

const useRepresentativeRegions = () => {
  const { data } = useQuery<
    AxiosResponse<ApiResponse<RegionsRepresentativeResponse[]>, Error>
  >({
    queryKey: ["representativeRegions"],
    queryFn: getRepresentativeRegions,
  });
  return { data };
};

export default useRepresentativeRegions;
