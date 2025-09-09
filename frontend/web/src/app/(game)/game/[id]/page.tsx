"use client";

import useGetGameTiles from "@/entities/games/hooks/useGetGameTiles";
import useGetGameDetail from "@/entities/games/hooks/useGetGameDetail";
import type { TripGameView } from "@/entities/games/model/gameInfoDummy";
import GamePlay from "@/entities/games/ui/game-play/GamePlay";

type Props = {
  params: {
    id: string;
  };
};

const GamePlayPage = ({ params }: Props) => {
  const { data: tilesRes } = useGetGameTiles(params.id);
  const { data: detailRes } = useGetGameDetail(params.id);

  const tileViews = tilesRes?.data?.dataBody?.slice(0, 15) ?? [];
  const detail = detailRes?.data?.dataBody;

  if (!tileViews.length || !detail) return null;

  // Map GameDetail to TripGameView expected by GamePlay
  const tripGameView: TripGameView = {
    tripGameId: detail.tripGameId,
    gameStatus: detail.endTypeCode ? "ENDED" : "ONGOING",
    gameStatusDescription: detail.endTypeCode ? "게임 종료" : "진행 중",
    difficultyCode: detail.difficultyCode,
    difficultyDescription: detail.difficultyDescription,
    startedAt: detail.startedAt,
    endedAt: detail.endedAt,
    representativeRegionName: detail.representativeRegionName,
    tripThemeNames: detail.tripThemeNames,
    isHost: false,
    isReady: true,
  };

  return <GamePlay tripGameView={tripGameView} tripGameTileViews={tileViews} />;
};
export default GamePlayPage;
