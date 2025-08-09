import { ApiResponse } from "@/shared/types";

interface TripGameView {
  tripGameId: number;
  gameStatus: string;
  gameStatusDescription: string;
  difficultyCode: string;
  difficultyDescription: string;
  startedAt: string;
  endedAt: string;
  representativeRegionName: string;
  tripThemeNames: string[];
  isHost: boolean;
  isReady: boolean;
}

export interface TripGameTileView {
  tripGameTileId: number;
  tripSpotId: number;
  stepNo: number;
  tileTypeCode: string;
  tileTypeDescription: string;
  tripSpotName: string;
}

export interface GameInfoDataBody {
  tripGameView: TripGameView;
  tripGameTileViews: TripGameTileView[];
}

export const gameInfoDummy: ApiResponse<GameInfoDataBody> = {
  dataHeader: {
    success: true,
    resultCode: null,
    resultMessage: null,
  },
  dataBody: {
    tripGameView: {
      tripGameId: 609394784645287936,
      gameStatus: "WAITING",
      gameStatusDescription: "게임 시작 전",
      difficultyCode: "EASY",
      difficultyDescription: "쉬움",
      startedAt: "2025-08-11",
      endedAt: "2025-08-14",
      representativeRegionName: "서울",
      tripThemeNames: ["축제/공연"],
      isHost: true,
      isReady: true,
    },
    tripGameTileViews: [
      {
        tripGameTileId: 609394785194741760,
        tripSpotId: 37558,
        stepNo: 1,
        tileTypeCode: "START",
        tileTypeDescription: "출발점",
        tripSpotName: "종로 어디나 스테이지",
      },
      {
        tripGameTileId: 609394785194741761,
        tripSpotId: 15813,
        stepNo: 2,
        tileTypeCode: "NORMAL",
        tileTypeDescription: "기본",
        tripSpotName: "반짝반짝 DDP (Twinkle DDP)",
      },
      {
        tripGameTileId: 609394785194741762,
        tripSpotId: 44611,
        stepNo: 3,
        tileTypeCode: "NORMAL",
        tileTypeDescription: "기본",
        tripSpotName: "2025 코리아그랜드세일",
      },
      {
        tripGameTileId: 609394785194741763,
        tripSpotId: 45070,
        stepNo: 4,
        tileTypeCode: "NORMAL",
        tileTypeDescription: "기본",
        tripSpotName: "2025 대한민국 미술축제",
      },
      {
        tripGameTileId: 609394785194741764,
        tripSpotId: 45031,
        stepNo: 5,
        tileTypeCode: "NORMAL",
        tileTypeDescription: "기본",
        tripSpotName: "2024 청와대 뮤직 페스티벌",
      },
      {
        tripGameTileId: 609394785194741765,
        tripSpotId: 2126,
        stepNo: 6,
        tileTypeCode: "MISSION",
        tileTypeDescription: "미션",
        tripSpotName: "경춘선 공릉숲길 커피축제",
      },
      {
        tripGameTileId: 609394785194741766,
        tripSpotId: 45243,
        stepNo: 7,
        tileTypeCode: "NORMAL",
        tileTypeDescription: "기본",
        tripSpotName: "DDP 디자인&아트",
      },
      {
        tripGameTileId: 609394785194741767,
        tripSpotId: 30864,
        stepNo: 8,
        tileTypeCode: "NORMAL",
        tileTypeDescription: "기본",
        tripSpotName: "외로움이의 집",
      },
      {
        tripGameTileId: 609394785194741761,
        tripSpotId: 15813,
        stepNo: 2,
        tileTypeCode: "NORMAL",
        tileTypeDescription: "기본",
        tripSpotName: "반짝반짝 DDP (Twinkle DDP)",
      },
      {
        tripGameTileId: 609394785194741768,
        tripSpotId: 25075,
        stepNo: 9,
        tileTypeCode: "NORMAL",
        tileTypeDescription: "기본",
        tripSpotName: "아시테지 국제여름축제",
      },
      {
        tripGameTileId: 609394785194741764,
        tripSpotId: 45031,
        stepNo: 5,
        tileTypeCode: "NORMAL",
        tileTypeDescription: "기본",
        tripSpotName: "2024 청와대 뮤직 페스티벌",
      },
      {
        tripGameTileId: 609394785194741765,
        tripSpotId: 2126,
        stepNo: 6,
        tileTypeCode: "MISSION",
        tileTypeDescription: "미션",
        tripSpotName: "경춘선 공릉숲길 커피축제",
      },
      {
        tripGameTileId: 609394785194741766,
        tripSpotId: 45243,
        stepNo: 7,
        tileTypeCode: "NORMAL",
        tileTypeDescription: "기본",
        tripSpotName: "DDP 디자인&아트",
      },
      {
        tripGameTileId: 609394785194741767,
        tripSpotId: 30864,
        stepNo: 8,
        tileTypeCode: "NORMAL",
        tileTypeDescription: "기본",
        tripSpotName: "외로움이의 집",
      },
      {
        tripGameTileId: 609394785194741768,
        tripSpotId: 25075,
        stepNo: 9,
        tileTypeCode: "NORMAL",
        tileTypeDescription: "기본",
        tripSpotName: "아시테지 국제여름축제",
      },
      {
        tripGameTileId: 609394785194741769,
        tripSpotId: 44620,
        stepNo: 10,
        tileTypeCode: "END",
        tileTypeDescription: "도착점",
        tripSpotName: "2025서울국제불교박람회",
      },
    ],
  },
};
