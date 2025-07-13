export interface TripSpot {
  tripSpotId: number;
  contentId: number;
  tripSpotName: string;
  thumbnailImageUrl: string;
}

export interface TripSpotsResponse {
  dataHeader: {
    success: boolean;
    resultCode: string | null;
    resultMessage: string | null;
  };
  dataBody: {
    contents: TripSpot[];
    hasNext: boolean;
  };
}
