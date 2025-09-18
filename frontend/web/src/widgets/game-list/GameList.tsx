"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Games.module.scss";
import { GameSummary } from "@/entities/games/hooks/useMyGameList";
import Carousel from "@/shared/ui/common/Carousel/Carousel";
import type { CardListItem } from "@/shared/ui/common/CardList/CardList";

export function GameList({ games }: { games: GameSummary[] }) {
  const items: CardListItem[] = games.map((game) => ({
    id: String(game.tripGameId),
    href: `/game/${game.tripGameId}`,
    imageUrl: game.representativeRegionImageUrl || "/images/no-image.png",
    regionName: game.representativeRegionName,
    title: game.title,
    description: "여행지에서 다양한 미션에 도전하세요!",
    date: game.startedAt,
  }));

  return (
    <div className={styles.gamesContainer}>
      <Carousel<CardListItem>
        items={items}
        renderItem={(item) => (
          <Link href={item.href ?? "#"} className={styles.carouselCard}>
            <Image
              src={item.imageUrl}
              alt={item.title || "대표 게임 이미지"}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
            />
            <div className={styles.imageOverlay}>
              {item.regionName && (
                <div className={styles.overlayTag}>{item.regionName}</div>
              )}
              <div className={styles.overlayTitle}>{item.title}</div>
              {item.description && (
                <div className={styles.overlayDesc}>{item.description}</div>
              )}
              {item.date && (
                <div className={styles.overlayDate}>{item.date}</div>
              )}
            </div>
          </Link>
        )}
      />
    </div>
  );
}
