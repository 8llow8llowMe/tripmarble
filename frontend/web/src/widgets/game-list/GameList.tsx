import Image from "next/image";
import styles from "./Games.module.scss";

type Game = {
  id: string;
  title: string;
  description: string;
  tag: string;
  imageUrl?: string;
  date: string;
};

export function GameList({ games }: { games: Game[] }) {
  const mainGame = games[0];
  const listGames = games.slice(1);

  return (
    <div className={styles.gamesContainer}>
      <div className={styles.leftBigImage}>
        <Image
          src={mainGame?.imageUrl || "/images/no-image.png"}
          alt="대표 게임 이미지"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 900px) 100vw, 48vw"
          priority
        />
        {/* 오버레이 정보 */}
        <div className={styles.imageOverlay}>
          <div className={styles.overlayTag}>{mainGame?.tag}</div>
          <div className={styles.overlayTitle}>{mainGame?.title}</div>
          <div className={styles.overlayDesc}>{mainGame?.description}</div>
          <div className={styles.overlayDate}>{mainGame?.date}</div>
        </div>
      </div>
      <div className={styles.listColumn}>
        {listGames.map((game) => (
          <div className={styles.card} key={game.id}>
            <Image
              className={styles.cardImage}
              src={game.imageUrl || "/images/no-image.png"}
              alt="게임 대표 이미지"
              width={60}
              height={60}
            />
            <div className={styles.cardContent}>
              <div className={styles.tag}>{game.tag}</div>
              <div className={styles.cardTitle}>{game.title}</div>
              <div className={styles.cardDesc}>{game.description}</div>
              <div className={styles.cardDate}>{game.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
