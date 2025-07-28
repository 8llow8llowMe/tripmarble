"use client";
import styles from "@/widgets/game-list/Games.module.scss";
import { GameList } from "@/widgets/game-list/GameList";
import { MyGamesHorizontal } from "@/widgets/my-games-horizontal/MyGamesHorizontal";
// data
import { gamesDummy } from "@/entities/games/model/gamesDummy";
import { myGamesDummy } from "@/entities/games/model/MyGamesDummy";

export const GamePage = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.sectionTitle}>다른 사람들이 한 게임 목록</div>
      <div className={styles.flexRow}>
        <GameList games={gamesDummy} />
      </div>

      <MyGamesHorizontal games={myGamesDummy} status="playing" />
      <MyGamesHorizontal games={myGamesDummy} status="ended" />
    </div>
  );
};
