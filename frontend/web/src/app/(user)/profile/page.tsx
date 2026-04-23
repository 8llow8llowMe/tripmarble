"use client";
import { ProfileInfo } from "@/features/profile/ProfileInfo";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./Profile.module.scss";
import HorizontalList from "@/shared/ui/common/HorizontalList/HorizontalList";
import useMyReviews from "@/entities/reviews/hooks/useMyReviews";
import EmptyGameState from "@/widgets/game-empty-state/EmptyGameState";
import { useMemo } from "react";
import Button from "@/shared/ui/common/Button/Button";

export default function Profile() {
  const router = useRouter();
  const { data, isLoading, isError, refetch, isFetching } = useMyReviews({
    size: 10,
    orderType: "DESC",
  });

  const reviewItems = useMemo(() => {
    const contents = data?.data?.dataBody?.contents ?? [];
    return contents.map((review) => ({
      id: review.tripSpotId || review.tripSpotReviewId,
      name:
        review.content?.length > 24
          ? `${review.content.slice(0, 24)}…`
          : review.content || "작성한 리뷰",
      imgUrl: review.photos?.[0]?.photoUrl || "/images/no-image.png",
      subtitle: `${
        typeof review.rating === "number" ? review.rating.toFixed(1) : "0.0"
      }점 · 리뷰`,
    }));
  }, [data]);

  return (
    <div className={`appPage ${styles.profileWrapper}`}>
      <ProfileInfo />
      <div className={`appPage ${styles.lists}`}>
        <section className={styles.reviewSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>내가 쓴 리뷰</h2>
            <Link href="/profile/reviews" className={styles.seeAll}>
              전체보기
            </Link>
          </div>
          {reviewItems.length > 0 ? (
            <HorizontalList
              items={reviewItems}
              baseHref="/trip-spots"
              itemWidth={200}
              itemHeight={300}
            />
          ) : null}
          {!isLoading && reviewItems.length === 0 && !isError ? (
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
              className={styles.emptyState}
            />
          ) : null}
          {isLoading || isFetching ? (
            <p className={styles.reviewMessage}>내 리뷰를 불러오는 중...</p>
          ) : null}
          {isError ? (
            <div className={styles.reviewActions}>
              <EmptyGameState
                role="alert"
                title="리뷰를 불러오지 못했습니다."
                message="네트워크 상태를 확인한 뒤 다시 시도해 주세요."
                action={
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={() => void refetch()}
                  >
                    다시 시도
                  </Button>
                }
              />
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
