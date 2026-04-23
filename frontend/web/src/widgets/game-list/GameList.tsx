"use client";

import type { ReactNode } from "react";
import styles from "./Games.module.scss";
import { GameSummary } from "@/entities/games/hooks/useMyGameList";
import CardRail from "@/shared/ui/common/Card/CardRail";
import MediaCard from "@/shared/ui/common/Card/MediaCard";
import type { CardListItem } from "@/shared/ui/common/CardList/CardList";
import EmptyGameState from "@/widgets/game-empty-state/EmptyGameState";

export function GameList({
  games,
  emptyAction,
}: {
  games: GameSummary[];
  emptyAction?: ReactNode;
}) {
  if (!games?.length) {
    return (
      <div className={styles.gamesContainer}>
        <EmptyGameState
          title="아직 만든 게임이 없습니다."
          message="여행지를 골라 첫 게임을 만들어 보세요."
          action={emptyAction}
        />
      </div>
    );
  }

  const items: CardListItem[] = games.map((game) => ({
    id: String(game.tripGameId),
    href: `/game/${game.tripGameId}`,
    imageUrl: game.representativeRegionImageUrl || "/images/no-image.png",
    regionName: game.representativeRegionName,
    status: game.gameStatus,
    title: game.title,
    description: "여행지에서 다양한 미션에 도전하세요!",
    date: game.startedAt,
  }));

  return (
    <div className={styles.gamesContainer}>
      <CardRail<CardListItem>
        items={items}
        itemWidth={280}
        gap={24}
        renderItem={(item) => (
          <MediaCard
            href={item.href}
            imageUrl={item.imageUrl}
            imageAlt={item.title || "대표 게임 이미지"}
            title={item.title}
            description={item.description}
            badge={item.regionName}
            meta={[item.status, item.date].filter(Boolean).join(" · ")}
            variant="overlay"
            ratio="portrait"
          />
        )}
      />
    </div>
  );
}
