import Image from "next/image";
import styles from "./Games.module.scss";
import Link from "next/link";
import Card from "@/shared/ui/common/Card/Card";
import { GameSummary } from "@/entities/games/hooks/useMyGameList";

export function GameList({ games }: { games: GameSummary[] }) {
  const mainGame = games[0];
  const listGames = games.slice(1, 5);

  return (
    <div className={styles.gamesContainer}>
      <div className={styles.leftBigImage} style={{ cursor: "pointer" }}>
        <Link
          key={mainGame.tripGameId}
          href={`/game-history/${mainGame.tripGameId}`}
        >
          <Image
            src={
              mainGame?.representativeRegionImageUrl || "/images/no-image.png"
            }
            alt="대표 게임 이미지"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 900px) 100vw, 24vw"
            priority
          />
          {/* 오버레이 정보 */}
          <div className={styles.imageOverlay}>
            <div className={styles.overlayTag}>
              {mainGame?.representativeRegionName}
            </div>
            <div className={styles.overlayTitle}>{mainGame?.title}</div>
            {/* <div className={styles.overlayDesc}>{mainGame?.description}</div> */}
            <div className={styles.overlayDesc}>
              여행지에서 다양한 미션에 도전하세요!
            </div>
            <div className={styles.overlayDate}>{mainGame?.startedAt}</div>
          </div>
        </Link>
      </div>
      <div className={styles.listColumn}>
        {listGames.map((game) => (
          <Card
            key={game.tripGameId}
            href={`/game-history/${game.tripGameId}`}
            imageUrl={
              game.representativeRegionImageUrl || "/images/no-image.png"
            }
            regionName={game.representativeRegionName}
            title={game.title}
            description="여행지에서 다양한 미션에 도전하세요!"
            date={game.startedAt}
          />
        ))}
      </div>
    </div>
  );
}
