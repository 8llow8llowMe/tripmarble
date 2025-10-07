"use client";
import { ProfileInfo } from "@/features/profile/ProfileInfo";
import Link from "next/link";

import styles from "./Profile.module.scss";
import HorizontalList from "@/shared/ui/common/HorizontalList/HorizontalList";
import useMyReviews from "@/entities/reviews/hooks/useMyReviews";
import EmptyGameState from "@/widgets/game-empty-state/EmptyGameState";
import { useMemo } from "react";

export default function Profile() {
  const { data, isLoading, isError } = useMyReviews({
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
              message="아직 작성한 리뷰가 없어요."
              className={styles.emptyState}
            />
          ) : null}
          {isLoading ? (
            <p className={styles.reviewMessage}>내 리뷰를 불러오는 중...</p>
          ) : null}
          {isError ? (
            <p className={styles.reviewMessage}>
              내 리뷰 정보를 불러오지 못했어요.
            </p>
          ) : null}
        </section>
      </div>
    </div>
  );
}
