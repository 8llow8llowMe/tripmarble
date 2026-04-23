"use client";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/shared/ui/common/Button/Button";
import Card from "@/shared/ui/common/Card/Card";
import CardGrid from "@/shared/ui/common/Card/CardGrid";
import EmptyGameState from "@/widgets/game-empty-state/EmptyGameState";
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMyGameListInfinite({ status: validStatus, size: 12 });
  const games = useMemo(
    () => data?.pages.flatMap((page) => page.data.dataBody.contents) ?? [],
    [data?.pages]
  );

  const observerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, games.length, hasNextPage, isFetchingNextPage]);

  return (
    <div className={`${styles.pageWrapper} appPage`}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>{statusLabel(validStatus)}</h1>
        <Button variant="secondary" size="sm" onClick={() => router.back()}>
          뒤로가기
        </Button>
      </div>
      {isLoading ? (
        <p className={styles.loading}>게임을 불러오는 중입니다.</p>
      ) : games.length > 0 ? (
        <>
          <CardGrid className={styles.grid} minItemWidth="240px">
            {games.map((game) => (
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
            ))}
          </CardGrid>
          <div ref={observerRef} className={styles.observer} aria-hidden />
        </>
      ) : (
        <EmptyGameState
          title="조건에 맞는 게임이 없습니다."
          message="게임을 만들거나 다른 상태의 목록을 확인해 주세요."
        />
      )}
      {isFetchingNextPage && <p className={styles.loading}>불러오는 중...</p>}
      {games.length > 0 && !isFetchingNextPage && !hasNextPage && (
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
