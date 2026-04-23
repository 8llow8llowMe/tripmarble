import { TripSpotDetailResponse } from "@/entities/trips/model/tripsType";

export type MapMarkerPoint = {
  id: string;
  lat: number;
  lng: number;
  title: string;
};

export type PolygonCoordinate = {
  lat: number;
  lng: number;
};

type PolygonRing = PolygonCoordinate[];
type RegionPolygon = PolygonRing[];

export type BoundaryGeoJsonItem =
  | {
      type?: string;
      coordinates?: unknown;
    }
  | null
  | undefined;

const MIN_POLYGON_POINTS = 3;

export const toImageSrc = (value: string | { src: string } | null | undefined) =>
  (typeof value === "string" ? value : value?.src) || "";

export const isValidCoordinate = (value: number) =>
  Number.isFinite(value) && Math.abs(value) > 0.000001;

export const formatRating = (rating: number) =>
  Number.isInteger(rating) ? rating.toString() : rating.toFixed(1);

export const normalizeDetail = (
  raw?: Partial<TripSpotDetailResponse>
): TripSpotDetailResponse | undefined => {
  if (!raw) return undefined;

  const latitude = Number(raw.latitude ?? 0);
  const longitude = Number(raw.longitude ?? 0);

  return {
    tripSpotId: raw.tripSpotId ?? 0,
    tripSpotName: raw.tripSpotName ?? "이름 없는 여행지",
    contentTypeName: raw.contentTypeName ?? "",
    description: raw.description ?? "",
    homepageUrl: raw.homepageUrl ?? "",
    phoneNumber: raw.phoneNumber ?? "",
    address: raw.address ?? "",
    addressDetail: raw.addressDetail ?? "",
    latitude: Number.isFinite(latitude) ? latitude : 0,
    longitude: Number.isFinite(longitude) ? longitude : 0,
    imageUrl: raw.imageUrl ?? "/images/no-image.png",
    originalImageUrl:
      raw.originalImageUrl ?? raw.imageUrl ?? "/images/no-image.png",
  };
};

export const parseBoundaryPolygons = (
  boundary: BoundaryGeoJsonItem
): RegionPolygon[] => {
  if (!boundary) return [];
  const { coordinates } = boundary;
  if (!coordinates) return [];

  let raw: unknown = coordinates;
  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      return [];
    }
  }

  const toCoordinate = (point: unknown): PolygonCoordinate | null => {
    if (Array.isArray(point) && point.length >= 2) {
      const [latRaw, lngRaw] = point as [unknown, unknown];
      const lat = Number(latRaw);
      const lng = Number(lngRaw);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
      return { lat, lng };
    }
    if (point && typeof point === "object") {
      const record = point as Record<string, unknown>;
      const lat =
        typeof record.lat === "number"
          ? record.lat
          : typeof record.latitude === "number"
          ? record.latitude
          : Number(record.lat ?? record.latitude);
      const lng =
        typeof record.lng === "number"
          ? record.lng
          : typeof record.longitude === "number"
          ? record.longitude
          : Number(record.lng ?? record.longitude);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
      return { lat, lng };
    }
    return null;
  };

  const unwrapList = (value: unknown): unknown[] | null => {
    if (Array.isArray(value)) return value;
    if (value && typeof value === "object") {
      const record = value as Record<string, unknown>;
      if (Array.isArray(record.points)) return record.points;
      if (Array.isArray(record.coordinates)) return record.coordinates;
      if (Array.isArray(record.rings)) return record.rings;
    }
    return null;
  };

  const toRing = (data: unknown): PolygonRing | null => {
    const list = unwrapList(data);
    if (!list) return null;
    const coords = list
      .map(toCoordinate)
      .filter((coord): coord is PolygonCoordinate => coord !== null);
    return coords.length >= MIN_POLYGON_POINTS ? coords : null;
  };

  const toPolygon = (data: unknown): RegionPolygon | null => {
    const list = unwrapList(data);
    if (!list) return null;
    const rings = list
      .map(toRing)
      .filter((ring): ring is PolygonRing => ring !== null);
    return rings.length ? rings : null;
  };

  const extractPolygons = (data: unknown): RegionPolygon[] => {
    const ring = toRing(data);
    if (ring) return [[ring]];
    const polygon = toPolygon(data);
    if (polygon) return [polygon];
    const list = unwrapList(data);
    if (!list) return [];
    return list
      .flatMap((item) => extractPolygons(item))
      .filter((poly) => poly.length > 0);
  };

  return extractPolygons(raw);
};
