// /src/entities/game/ui/MyGamesHorizontal.tsx

import styles from "./MyGamesHorizontal.module.scss";

// (예시) 타입 정의 - 실제 프로젝트의 games 타입에 맞게 수정하세요
export interface MyGame {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  status: "playing" | "ended";
}

interface MyGamesHorizontalProps {
  games: MyGame[];
  status?: "playing" | "ended"; // playing/ended 별로 구분해서 보여주고 싶다면
}

const MyGamesHorizontal = ({ games, status }: MyGamesHorizontalProps) => {
  // status가 있으면 해당 상태의 게임만 필터
  const filteredGames = status
    ? games.filter((g) => g.status === status)
    : games;

  if (!filteredGames.length) {
    return <div className={styles.empty}>참여한 게임이 없습니다.</div>;
  }

  return (
    <div className={styles.horizontalList}>
      <h3 className={styles.title}>
        {status === "playing" ? "진행 중인 게임" : "종료된 게임"}
      </h3>
      <div className={styles.scrollRow}>
        {filteredGames.map((game) => (
          <div className={styles.card} key={game.id}>
            <img
              src={game.imageUrl || "/images/no-image.png"}
              alt={game.title}
              className={styles.img}
            />
            <div className={styles.info}>
              <div className={styles.gameTitle}>{game.title}</div>
              <div className={styles.date}>{game.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyGamesHorizontal;
