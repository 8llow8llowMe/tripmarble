"use client";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "@/shared/ui/common/Card/Card";
import styles from "./GameListPage.module.scss";
import useMyGameListInfinite from "@/entities/games/hooks/useGameListInfinite";
import { GameStatus } from "@/entities/games/hooks/useMyGameList";

const statusLabel = (status?: GameStatus) => {
  if (status === "WAITING") return "시작전 게임";
  if (status === "ONGOING") return "진행중인 게임";
  if (status === "ENDED") return "종료된 게임";
  return "내 게임";
};

const GameListPageInner = () => {
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

  // navigation handled by Card href

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
            <Card
              key={game.tripGameId}
              href={`/game/${game.tripGameId}`}
              imageUrl={
                game.representativeRegionImageUrl || "/images/no-image.png"
              }
              regionName={game.representativeRegionName}
              title={game.title}
              date={game.startedAt}
            />
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
};

export default function GameListPage() {
  return (
    <Suspense fallback={<div className="appPage">로딩중…</div>}>
      <GameListPageInner />
    </Suspense>
  );
}
