import { apiClient } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";

// 특정 시도의 시군구 목록 조회
export const getSigungusByRegion = (regionId: string) =>
  apiClient.get(`/regions/${regionId}/sigungus`);

const useSigungusByRegion = (regionId: string) => {
  const { data } = useQuery({
    queryKey: ["sigungus", regionId],
    queryFn: () => getSigungusByRegion(regionId),
  });
  return { data };
};

export default useSigungusByRegion;
