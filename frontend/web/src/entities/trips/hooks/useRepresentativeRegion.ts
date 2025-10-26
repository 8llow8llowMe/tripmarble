import { apiClient } from "@/shared/lib/api/client";
import { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

// 대표 여행지 상세 응답 타입
export interface RepresentativeRegionDetail {
  representativeRegionId: string;
  representativeRegionName: string;
  representativeRegionImageUrl: string | null;
  description: string | null;
  boundaryGeoJsonItem: {
    type: string;
    coordinates: number[][][] | string | null;
  } | null;
}

// 대표 여행지 상세 조회
export const getRepresentativeRegion = (
  representativeRegionId: string | number
) =>
  apiClient.get<ApiResponse<RepresentativeRegionDetail>>(
    `/regions/representative/${representativeRegionId}`
  );

const useRepresentativeRegion = (representativeRegionId?: string | number) => {
  const query = useQuery<
    AxiosResponse<ApiResponse<RepresentativeRegionDetail>, Error>
  >({
    queryKey: ["representativeRegion", representativeRegionId],
    queryFn: () => getRepresentativeRegion(String(representativeRegionId)),
    enabled: !!representativeRegionId,
  });
  return query;
};

export default useRepresentativeRegion;
