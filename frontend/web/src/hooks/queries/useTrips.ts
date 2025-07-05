import { useQuery } from "@tanstack/react-query";
import {
  getRegions,
  getSigungusByRegion,
  getTripContentTypes,
  getRepresentativeRegions,
  getTripSpotsByRepresentativeRegion,
  getTripSpotById,
} from "@/apis/trips";

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
  useQuery({
    queryKey: ["tripSpotsByRepresentativeRegion", representativeRegionId],
    queryFn: () => getTripSpotsByRepresentativeRegion(representativeRegionId),
  });

export const useTripSpotById = (tripSpotId: string) =>
  useQuery({
    queryKey: ["tripSpot", tripSpotId],
    queryFn: () => getTripSpotById(tripSpotId),
  });
