import Image from "next/image";
import Link from "next/link";
import styles from "./MyGamesHorizontal.module.scss";

export type MyGame = {
  id: string;
  title: string;
  status: "playing" | "ended";
  imageUrl?: string;
  date: string;
};

export function MyGamesHorizontal({
  games,
  status,
}: {
  games: MyGame[];
  status: "playing" | "ended";
}) {
  return (
    <>
      <div className={styles.sectionTitle}>
        {status === "playing" ? "진행중인 내 게임" : "진행 종료된 내 게임"}
      </div>
      <div className={styles.horizontalList}>
        {games
          .filter((g) => g.status === status)
          .map((game) => (
            <div className={styles.hCard} key={game.id}>
              <Link key={game.id} href={`/game/${game.id}`}>
                <Image
                  src={game.imageUrl || "/images/no-image.png"}
                  alt="게임 이미지"
                  width={220}
                  height={200}
                  style={{ borderRadius: "8px" }}
                />
                <div className={styles.hCardTitle}>{game.title}</div>
                <div className={styles.hCardDate}>{game.date}</div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
