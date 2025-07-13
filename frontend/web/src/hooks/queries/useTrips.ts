import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getRegions,
  getSigungusByRegion,
  getTripContentTypes,
  getRepresentativeRegions,
  getTripSpotsByRepresentativeRegion,
  getTripSpotById,
} from "@/apis/trips";
import { AxiosResponse } from "axios";
import { TripSpotsResponse } from "@/types/tripsType";

export const useRegions = () =>
  useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });

export const useSigungusByRegion = (regionId: string) =>
  useQuery({
    queryKey: ["sigungus", regionId],
    queryFn: () => getSigungusByRegion(regionId),
  });

export const useTripContentTypes = () =>
  useQuery({
    queryKey: ["tripContentTypes"],
    queryFn: getTripContentTypes,
  });

export const useRepresentativeRegions = () =>
  useQuery({
    queryKey: ["representativeRegions"],
    queryFn: getRepresentativeRegions,
  });

export const useTripSpotsByRepresentativeRegion = (
  representativeRegionId: string
) =>
  useInfiniteQuery<AxiosResponse<TripSpotsResponse>, Error>({
    queryKey: ["tripSpotsByRepresentativeRegion", representativeRegionId],
    queryFn: ({ pageParam }) =>
      getTripSpotsByRepresentativeRegion(
        representativeRegionId,
        pageParam as number | null
      ),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      const contents = lastPage.data.dataBody.contents;
      const hasNext = lastPage.data.dataBody.hasNext;
      if (!hasNext || contents.length === 0) return undefined;
      return contents[contents.length - 1].tripSpotId;
    },
  });

export const useTripSpotById = (tripSpotId: string) =>
  useQuery({
    queryKey: ["tripSpot", tripSpotId],
    queryFn: () => getTripSpotById(tripSpotId),
  });
