import Image from "next/image";
import Link from "next/link";
import styles from "./MyGamesHorizontal.module.scss";

export type MyGame = {
  tripGameId: number;
  gameStatus: "WAITING" | "ONGOING" | "ENDED";
  gameStatusDescription: "게임 시작 전" | "게임 진행 중" | "게임 종료";
  difficultyCode: "EASY" | "NORMAL" | "HARD";
  difficultyDescription: "쉬움" | "보통" | "어려움";
  representativeRegionImageUrl: string | null;
  representativeRegionName: string;
  title: string;
  startedAt: string;
  endedAt: string;
  tripThemeNames: string[];
  isHost: boolean;
  isReady: boolean;
};

export function MyGamesHorizontal({
  games,
  gameStatus,
}: {
  games: MyGame[] | undefined;
  gameStatus: "WAITING" | "ONGOING" | "ENDED";
}) {
  return (
    <>
      <div className={styles.sectionTitle}>
        {gameStatus !== "ENDED" ? "진행중인 내 게임" : "진행 종료된 내 게임"}
      </div>
      <div className={styles.horizontalList}>
        {games &&
          games
            // .filter((g) => g.gameStatus === gameStatus)
            .map((game) => (
              <div className={styles.hCard} key={game.tripGameId}>
                <Link key={game.tripGameId} href={`/game/${game.tripGameId}`}>
                  <Image
                    src={
                      game.representativeRegionImageUrl ||
                      "/images/no-image.png"
                    }
                    alt="게임 이미지"
                    width={220}
                    height={200}
                    style={{ borderRadius: "8px" }}
                  />
                  <div className={styles.hCardTitle}>{game.title}</div>
                  <div className={styles.hCardDate}>{game.startedAt}</div>
                </Link>
              </div>
            ))}
      </div>
    </>
  );
}
