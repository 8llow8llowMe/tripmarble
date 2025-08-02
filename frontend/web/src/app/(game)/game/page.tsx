"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// styles
import styles from "./Game-page.module.scss";
// components
import { GameList } from "@/widgets/game-list/GameList";
import { MyGamesHorizontal } from "@/widgets/my-games-horizontal/MyGamesHorizontal";
import Button from "@/shared/ui/common/Button/Button";
import CreateGameModal from "@/features/game/create-game/ui/CreateGameModal";
// datas
import { gamesDummy } from "@/entities/games/model/gamesDummy";
import { myGamesDummy } from "@/entities/games/model/MyGamesDummy";
// stores
import { useAppSelector } from "@/entities/users/model";

export default function Game() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);

  const handleCreateClick = () => {
    if (!user) {
      toast.info("로그인 후 게임을 만들 수 있습니다.");
      router.push("/login");
      return;
    }
    setCreateModalOpen(true);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleAndButton}>
        <div className={styles.sectionTitle}>다른 사람들이 한 게임 목록</div>
        <Button
          radius="md"
          bgColor="primary"
          paddingSize="md"
          width="200px"
          height="50px"
          onClick={handleCreateClick}
        >
          게임 만들기
        </Button>
      </div>
      <div className={styles.flexRow}>
        <GameList games={gamesDummy} />
      </div>

      <MyGamesHorizontal games={myGamesDummy} status="playing" />
      <MyGamesHorizontal games={myGamesDummy} status="ended" />

      <CreateGameModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
}
