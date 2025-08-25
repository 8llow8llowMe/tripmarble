import Image from "next/image";
import styles from "./MyGamesHorizontal.module.scss";
import useMyGameList, {
  GameStatus,
} from "@/entities/games/hooks/useMyGameList";
import { useRouter } from "next/navigation";
import { fetchGameStart } from "@/entities/games/hooks/useGameStart";

export function MyGamesHorizontal({ type }: { type: GameStatus }) {
  const router = useRouter();
  const { data } = useMyGameList({ status: type });
  const games = data?.data.dataBody.contents;

  const handleClick = async (gameId: string) => {
    if (type === "WAITING") {
      await fetchGameStart(gameId);
    }
    console.log(gameId);
    router.push(`/game/${gameId}`);
  };

  return (
    <>
      {games && games.length > 0 ? (
        <>
          <div className={styles.sectionTitle}>
            {type === "WAITING"
              ? "시작 전 게임"
              : type === "ONGOING"
              ? "진행중인 내 게임"
              : "진행 종료된 내 게임"}
          </div>
          <div className={styles.horizontalList}>
            {games.map((game) => (
              <div
                className={styles.hCard}
                key={game.tripGameId}
                onClick={() => handleClick(game.tripGameId)}
              >
                <Image
                  src={
                    game.representativeRegionImageUrl || "/images/no-image.png"
                  }
                  alt="게임 이미지"
                  width={220}
                  height={200}
                  style={{ borderRadius: "8px" }}
                />
                <div className={styles.hCardTitle}>{game.title}</div>
                <div className={styles.hCardDate}>{game.startedAt}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
