"use client";
import { useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "./GameListPage.module.scss";
import useMyGameListInfinite from "@/entities/games/hooks/useGameListInfinite";
import { GameStatus } from "@/entities/games/hooks/useMyGameList";

const statusLabel = (status?: GameStatus) => {
  if (status === "WAITING") return "시작 전 게임";
  if (status === "ONGOING") return "진행중인 내 게임";
  if (status === "ENDED") return "진행 종료된 내 게임";
  return "내 게임";
};

export default function MyGameListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") as GameStatus | null;

  const validStatus: GameStatus | undefined = useMemo(() => {
    return status === "WAITING" || status === "ONGOING" || status === "ENDED"
      ? status
      : undefined;
  }, [status]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyGameListInfinite({ status: validStatus, size: 12 });

  const observerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const handleClick = (gameId: string) => {
    router.push(`/game/${gameId}`);
  };

  return (
    <div className={`${styles.pageWrapper} appPage`}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>{statusLabel(validStatus)}</h1>
        <button
          className={styles.backBtn}
          onClick={() => router.back()}
          type="button"
        >
          뒤로가기
        </button>
      </div>
      <section className={styles.grid}>
        {data?.pages.flatMap((page) =>
          page.data.dataBody.contents.map((game) => (
            <div
              key={game.tripGameId}
              className={styles.card}
              onClick={() => handleClick(game.tripGameId)}
            >
              <div className={styles.thumb}>
                <Image
                  src={
                    game.representativeRegionImageUrl || "/images/no-image.png"
                  }
                  alt={game.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 16rem"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.meta}>
                <div className={styles.region}>
                  {game.representativeRegionName}
                </div>
                <div className={styles.name}>{game.title}</div>
                <div className={styles.date}>{game.startedAt}</div>
              </div>
            </div>
          ))
        )}
        <div ref={observerRef} />
      </section>
      {isFetchingNextPage && <p className={styles.loading}>불러오는 중...</p>}
      {!isFetchingNextPage && !hasNextPage && (
        <p className={styles.end}>더 이상 표시할 항목이 없어요.</p>
      )}
    </div>
  );
}
