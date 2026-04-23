"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// styles
import styles from "./GameList.module.scss";
// components
import { GameList } from "@/widgets/game-list/GameList";
import { GameListHorizontal } from "@/widgets/game-list-horizontal/GameListHorizontal";
import Button from "@/shared/ui/common/Button/Button";
import CreateGameModal from "@/features/game/create-game/ui/CreateGameModal";

// stores
import { useAppSelector } from "@/entities/users/model";
import useMyGameList from "@/entities/games/hooks/useMyGameList";

export default function Game() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const router = useRouter();
  const user = useAppSelector((state) => state?.user.user);

  const handleCreateClick = () => {
    if (!user) {
      toast.info("로그인 후 게임을 만들 수 있습니다.");
      router.push("/login");
      return;
    }
    setCreateModalOpen(true);
  };

  const { data } = useMyGameList();
  const games = data?.data.dataBody.contents;

  return (
    <div className={`${styles.mainContainer} appPage`}>
      <div className={styles.titleAndButton}>
        <div className={styles.sectionTitle}>모든 게임</div>
        <Button
          variant="primary"
          size="md"
          className={styles.createButton}
          onClick={handleCreateClick}
        >
          게임 만들기
        </Button>
      </div>
      {games && (
        <div className={styles.flexRow}>
          <GameList
            games={games}
            emptyAction={
              <Button variant="primary" size="md" onClick={handleCreateClick}>
                게임 만들기
              </Button>
            }
          />
        </div>
      )}

      <GameListHorizontal type={"ONGOING"} />
      <GameListHorizontal type={"WAITING"} />
      <GameListHorizontal type={"ENDED"} />

      <CreateGameModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
}
