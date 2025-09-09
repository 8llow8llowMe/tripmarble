import styles from "./GameListHorizontal.module.scss";
import useMyGameList, {
  GameStatus,
} from "@/entities/games/hooks/useMyGameList";
import { useRouter } from "next/navigation";
import { fetchGameStart } from "@/entities/games/hooks/useGameStart";
import CardList from "@/shared/ui/common/CardList/CardList";
import Image from "next/image";
import { NoGame } from "@/shared/assets/images";

export function GameListHorizontal({ type }: { type: GameStatus }) {
  const router = useRouter();
  const { data } = useMyGameList({ status: type });
  const games = data?.data.dataBody.contents;

  const handleClick = async (gameId: string) => {
    if (type === "WAITING") {
      await fetchGameStart(gameId);
    }
    router.push(`/game/${gameId}`);
  };

  const handleSeeAll = () => {
    router.push(`/game/list?status=${type}`);
  };

  const items = (games || []).map((game) => ({
    id: game.tripGameId,
    imageUrl: game.representativeRegionImageUrl || "/images/no-image.png",
    regionName: game.representativeRegionName,
    title: game.title,
    date: game.startedAt,
  }));

  return (
    <>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          {type === "WAITING"
            ? "시작 전 게임"
            : type === "ONGOING"
            ? "진행중인 내 게임"
            : "진행 종료된 내 게임"}
        </div>
        <button
          className={styles.seeAllBtn}
          onClick={handleSeeAll}
          type="button"
        >
          전체보기
        </button>
      </div>
      {items.length > 0 ? (
        <CardList
          title=""
          items={items}
          itemWidth={250}
          gap={18}
          onItemClick={(item) => handleClick(item.id)}
        />
      ) : (
        <div className={styles.emptyState} role="status" aria-live="polite">
          <div className={styles.emptyImageWrapper}>
            <Image
              src={NoGame}
              alt="표시할 게임이 없음"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 520px"
              style={{ objectFit: "cover" }}
            />
            <div className={styles.emptyOverlay}>
              <div className={styles.emptyText}>현재 표시할 게임이 없어요.</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
