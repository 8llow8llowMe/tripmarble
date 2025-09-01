"use client";

import useGetGameTiles from "@/entities/games/hooks/useGetGameTiles";
import { gameInfoDummy } from "@/entities/games/model/gameInfoDummy";
import GamePlay from "@/entities/games/ui/game-play/GamePlay";

type Props = {
  params: {
    id: string;
  };
};

const GamePlayPage = ({ params }: Props) => {
  const { data } = useGetGameTiles(params.id);
  const tileViews = data?.data?.dataBody?.slice(0, 15) ?? [];

  if (!tileViews.length) return null;
  return (
    tileViews && (
      <GamePlay
        tripGameView={gameInfoDummy.dataBody.tripGameView}
        tripGameTileViews={tileViews}
      />
    )
  );
};
export default GamePlayPage;
