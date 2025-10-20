import styles from "./GameListHorizontal.module.scss";
import useMyGameList, {
  GameStatus,
} from "@/entities/games/hooks/useMyGameList";
import { useRouter } from "next/navigation";
import { fetchGameStart } from "@/entities/games/hooks/useGameStart";
import CardList from "@/shared/ui/common/CardList/CardList";
import EmptyGameState from "@/widgets/game-empty-state/EmptyGameState";

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
            ? "시작전 게임"
            : type === "ONGOING"
            ? "진행중인 게임"
            : "종료된 게임"}
        </div>
        <button
          className={styles.seeAllBtn}
          onClick={handleSeeAll}
          type="button"
        >
          전체보기
        </button>
      </div>
      <div className={styles.cardListWrapper}>
        {items.length > 0 ? (
          <CardList
            title=""
            items={items}
            itemWidth={250}
            gap={18}
            onItemClick={(item) => handleClick(item.id)}
          />
        ) : (
          <EmptyGameState />
        )}
      </div>
    </>
  );
}
