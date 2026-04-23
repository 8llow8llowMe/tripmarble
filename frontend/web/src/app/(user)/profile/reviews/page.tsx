"use client";

import { Suspense, useEffect, useMemo, useRef, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./MyReviewsPage.module.scss";
import Button from "@/shared/ui/common/Button/Button";
import CardGrid from "@/shared/ui/common/Card/CardGrid";
import MediaCard from "@/shared/ui/common/Card/MediaCard";
import {
  ReviewSourceType,
  ReviewOrderType,
  useMyReviewsInfinite,
} from "@/entities/reviews/hooks/useMyReviews";
import EmptyGameState from "@/widgets/game-empty-state/EmptyGameState";

type FilterOption = {
  value: "ALL" | ReviewSourceType;
  label: string;
};

const FILTER_OPTIONS: FilterOption[] = [
  { value: "ALL", label: "전체" },
  { value: "GENERAL", label: "일반 리뷰" },
  { value: "GAME_MISSION", label: "게임 리뷰" },
];

const filterLabel = (value: "ALL" | ReviewSourceType) =>
  FILTER_OPTIONS.find((option) => option.value === value)?.label ?? "전체";

const ORDER_OPTIONS: { value: ReviewOrderType; label: string }[] = [
  { value: "DESC", label: "최신순" },
  { value: "ASC", label: "오래된순" },
];

const orderLabel = (value: ReviewOrderType) =>
  ORDER_OPTIONS.find((option) => option.value === value)?.label ?? "최신순";

const ReviewsPageInner = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const sourceParam = (searchParams.get("sourceType") ?? "ALL").toUpperCase();
  const validSource = useMemo<"ALL" | ReviewSourceType>(() => {
    return sourceParam === "GENERAL" || sourceParam === "GAME_MISSION"
      ? (sourceParam as ReviewSourceType)
      : "ALL";
  }, [sourceParam]);

  const orderParam = (searchParams.get("orderType") ?? "DESC").toUpperCase();
  const validOrder = useMemo<ReviewOrderType>(() => {
    return orderParam === "ASC" ? "ASC" : "DESC";
  }, [orderParam]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useMyReviewsInfinite({
    sourceType: validSource === "ALL" ? undefined : validSource,
    size: 12,
    orderType: validOrder,
  });

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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const updateQuery = (updater: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams);
    updater(params);
    const queryString = params.toString();
    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  };

  const handleSourceChange = (value: "ALL" | ReviewSourceType) => {
    updateQuery((params) => {
      if (value === "ALL") {
        params.delete("sourceType");
      } else {
        params.set("sourceType", value);
      }
    });
  };

  const handleOrderChange = (value: ReviewOrderType) => {
    updateQuery((params) => {
      if (value === "DESC") {
        params.delete("orderType");
      } else {
        params.set("orderType", value);
      }
    });
  };

  const reviews =
    data?.pages.flatMap((page) => page.data.dataBody.contents) ?? [];
  const showEmpty = !isLoading && !isError && reviews.length === 0;

  return (
    <div className={`${styles.pageWrapper} appPage`}>
      <header className={styles.headerRow}>
        <div className={styles.titleDiv}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>내가 쓴 리뷰</h1>
            <p className={styles.subtitle}>
              {filterLabel(validSource)} · {orderLabel(validOrder)}
            </p>
          </div>
          <Link href="/profile" className={styles.backLink}>
            <span className={styles.backTextFull}>프로필로 돌아가기</span>
            <span className={styles.backTextCompact}>프로필로</span>
          </Link>
        </div>
        <div className={styles.actions}>
          <select
            className={styles.filterSelect}
            value={validSource}
            onChange={(e) =>
              handleSourceChange(e.target.value as "ALL" | ReviewSourceType)
            }
            aria-label="리뷰 종류 필터"
          >
            {FILTER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            className={styles.filterSelect}
            value={validOrder}
            onChange={(e) =>
              handleOrderChange(e.target.value as ReviewOrderType)
            }
            aria-label="정렬 순서"
          >
            {ORDER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      {isError && (
        <div className={styles.error} role="alert">
          <p>리뷰를 불러오지 못했습니다.</p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => void refetch()}
          >
            다시 시도
          </Button>
        </div>
      )}

      {showEmpty ? (
        <EmptyGameState
          title="작성한 리뷰가 없습니다."
          message="여행지에 방문한 기록을 리뷰로 남겨보세요."
          action={
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => router.push("/spots")}
            >
              여행지 둘러보기
            </Button>
          }
        />
      ) : (
        <CardGrid className={styles.grid} minItemWidth="260px">
          {reviews.map((review) => {
            const rating =
              typeof review.rating === "number"
                ? review.rating.toFixed(1)
                : "0.0";
            const source =
              review.reviewSourceTypeDescription ||
              (review.reviewSourceTypeCode === "GAME_MISSION"
                ? "게임 리뷰"
                : "일반 리뷰");
            const content = review.content?.length
              ? review.content
              : "리뷰 내용을 불러오지 못했습니다.";

            return (
              <MediaCard
                key={review.tripSpotReviewId}
                href={`/trip-spots/${review.tripSpotId}`}
                imageUrl={review.photos?.[0]?.photoUrl || "/images/no-image.png"}
                imageAlt="리뷰 이미지"
                title={content}
                badge={source}
                meta={`${rating}점`}
                ratio="landscape"
              />
            );
          })}
          <div ref={observerRef} />
        </CardGrid>
      )}

      {(isLoading || isFetchingNextPage || isPending) && (
        <p className={styles.loading}>불러오는 중...</p>
      )}
      {!isFetchingNextPage &&
        !isLoading &&
        !hasNextPage &&
        reviews.length > 0 && (
          <p className={styles.end}>더 이상 표시할 리뷰가 없어요.</p>
        )}
    </div>
  );
};

export default function MyReviewsPage() {
  return (
    <Suspense fallback={<div className="appPage">로딩중…</div>}>
      <ReviewsPageInner />
    </Suspense>
  );
}
