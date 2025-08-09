import { gameInfoDummy } from "@/entities/games/model/gameInfoDummy";
import GamePlay from "@/entities/games/ui/game-play/GamePlay";

type Props = {
  params: {
    gameId: string;
  };
};

export default function GamePlayPage({ params }: Props) {
  // TODO: 임시로 더미데이터 전달, 추후에 gameId로 gameInfo 받아온 후 게임 페이지로 전달 예정
  const gameData = gameInfoDummy;
  return <GamePlay gameData={gameData} />;
}
