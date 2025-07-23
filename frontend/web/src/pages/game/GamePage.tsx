"use client";
import styles from "@/widgets/game-list/Games.module.scss";
import { GameList } from "@/widgets/game-list/GameList";
import { MyGame, MyGamesHorizontal } from "@/widgets/my-games-horizontal/MyGamesHorizontal";

// 더미 데이터
const games = [
  {
    id: "1",
    title: "부산 광안리 투어 게임",
    description: "광안대교를 건너며 팀 대항 미션에 도전하세요!",
    tag: "BUDGET TRAVEL",
    imageUrl: "/images/no-image.png",
    date: "2024-07-15 · 15명 참여",
  },
  {
    id: "2",
    title: "서울 숨은 명소 스탬프랠리",
    description: "서울 곳곳의 명소를 찾아 인증샷을 남겨보세요.",
    tag: "FAMILY TRAVEL",
    imageUrl: "/images/no-image.png",
    date: "2024-07-11 · 8명 참여",
  },
  {
    id: "3",
    title: "제주 자연 탐험 게임",
    description: "제주의 아름다운 자연 속에서 미션을 해결하세요.",
    tag: "NATURE ADVENTURE",
    imageUrl: "/images/no-image.png",
    date: "2024-07-10 · 20명 참여",
  },
  {
    id: "4",
    title: "인천 역사 골든벨",
    description: "인천의 역사 유적지를 돌며 퀴즈를 풀어보세요.",
    tag: "HISTORY QUIZ",
    imageUrl: "/images/no-image.png",
    date: "2024-07-09 · 12명 참여",
  },
  {
    id: "5",
    title: "강릉 바다 미션런",
    description: "강릉 바닷가에서 팀 미션을 완수해보세요.",
    tag: "SEA ADVENTURE",
    imageUrl: "/images/no-image.png",
    date: "2024-07-08 · 17명 참여",
  },
];

const myGames: MyGame[] = [
  {
    id: "mg1",
    title: "경주 골목길 탐험",
    status: "playing",
    imageUrl: "",
    date: "2024-07-14 시작",
  },
  {
    id: "mg2",
    title: "제주 자연 속 방탈출",
    status: "ended",
    imageUrl: "/images/no-image.png",
    date: "2024-07-10 종료",
  },
  {
    id: "mg3",
    title: "서울 고궁 탐방",
    status: "playing",
    imageUrl: "/images/no-image.png",
    date: "2024-07-09 시작",
  },
];

export default function GamesPage() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.sectionTitle}>다른 사람들이 한 게임 목록</div>
      <div className={styles.flexRow}>
        <GameList games={games} />
      </div>

      <MyGamesHorizontal games={myGames} status="playing" />
      <MyGamesHorizontal games={myGames} status="ended" />
    </div>
  );
}
