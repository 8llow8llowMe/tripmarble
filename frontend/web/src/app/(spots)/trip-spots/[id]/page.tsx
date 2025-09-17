"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

import useTripSpotById from "@/entities/trips/hooks/useTripSpotById";
import useTripSpotReviewSummary from "@/entities/trips/hooks/useTripSpotReviewSummary";
import useTripSpotReviews from "@/entities/trips/hooks/useTripSpotReviews";
import { TripSpotDetailResponse } from "@/entities/trips/model/tripsType";

import TripSpotReviewModal from "./TripSpotReviewModal";
import styles from "./TripSpotDetail.module.scss";

type Props = {
  params: {
    id: string;
  };
};

type TabKey = "details" | "reviews";

const TABS: { key: TabKey; label: string }[] = [
  { key: "details", label: "상세정보" },
  { key: "reviews", label: "리뷰" },
];

const formatRating = (rating: number) =>
  Number.isInteger(rating) ? rating.toString() : rating.toFixed(1);

const dummySpot: TripSpotDetailResponse = {
  tripSpotId: 0,
  tripSpotName: "[백년가게] 더미데이터입니다",
  contentTypeName: "음식점",
  description:
    "1980년부터 행상에서 곰장어 장사를 시작하여 현재 3층 규모의 자가 건물을 보유하고 있다고 하니 그동안의 고객의 사랑을 얼마나 받았을지 가늠이 간다. 부모님 추천 맛집이라는 수식어가 붙을 정도로 오래된 단골 고객들이 많은 곳이다. 특유의 매우면서 묘한 양념 맛이 구수한 곰장어와 어울려 감탄을 자아내는데, 민락동 중앙수산에서 구매한 신선한 곰장어와 국내산 고춧가루를 사용하는 것이 맛에 한몫하는 듯하다. 전국 택배 배송도 가능해, 집에서도 온천 입구 기장 곰장어 맛을 맛볼 수 있다.",
  homepageUrl: "",
  phoneNumber: "051-555-6093",
  address: "부산광역시 동래구 시실로 20 (명륜동)",
  addressDetail: "",
  longitude: 0,
  latitude: 0,
  imageUrl: "/images/no-image.png",
  thumbnailImageUrl: "/images/no-image.png",
};

export default function TripSpotDetail({ params }: Props) {
  const tripSpotId = params.id;

  const [activeTab, setActiveTab] = useState<TabKey>("details");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // const {
  //   data: spotResponse,
  //   isLoading: isSpotLoading,
  //   isError: isSpotError,
  // } = useTripSpotById(tripSpotId);

  const {
    data: summaryResponse,
    isLoading: isSummaryLoading,
    refetch: refetchSummary,
  } = useTripSpotReviewSummary(tripSpotId);

  const {
    data: reviewPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isReviewsLoading,
    refetch: refetchReviews,
  } = useTripSpotReviews(tripSpotId);

  const spot = useMemo(() => {
    // 정상 데이터 있으면 반환, 아니면 더미 반환
    // const fetched = spotResponse?.data?.dataBody as
    //   | Partial<TripSpotDetailResponse>
    //   | undefined;
    // if (!fetched) {
    //   return dummySpot;
    // }
    // return {
    //   ...dummySpot,
    //   ...fetched,
    // };
    return dummySpot;
  }, []);

  const coverImage =
    spot.thumbnailImageUrl || spot.imageUrl || "/images/no-image.png";

  const summary = summaryResponse?.data?.dataBody;
  const totalReviews = summary?.totalCount ?? 0;
  const averageRating = summary?.averageRating ?? 0;
  const hasReviews = totalReviews > 0;
  const averageRatingText = hasReviews ? averageRating.toFixed(1) : "0.0";

  const reviews =
    reviewPages?.pages.flatMap((page) => page.data.dataBody.contents) ?? [];

  const handleTabChange = useCallback((tab: TabKey) => {
    setActiveTab(tab);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleOpenReviewModal = useCallback(() => {
    setIsReviewModalOpen(true);
  }, []);

  const handleCloseReviewModal = useCallback(() => {
    setIsReviewModalOpen(false);
  }, []);

  const handleReviewCreated = useCallback(() => {
    setActiveTab("reviews");
    void refetchSummary();
    void refetchReviews();
  }, [refetchReviews, refetchSummary]);

  // if (isSpotError) {
  //   return (
  //     <div className={styles.detailPage}>
  //       <p className={styles.errorState}>여행지 정보를 불러오지 못했습니다.</p>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.detailPage}>
      <div className={styles.heroSection}>
        <div className={styles.imageWrapper}>
          <Image
            src={coverImage}
            alt={`${spot.tripSpotName} 대표 이미지`}
            width={600}
            height={400}
            style={{ objectFit: "cover", width: "100%" }}
            priority
          />
        </div>
        <div className={styles.primaryInfo}>
          <p className={styles.spotType}>{spot.contentTypeName}</p>
          <h1 className={styles.spotName}>{spot.tripSpotName}</h1>

          {/* {isSpotLoading ? (
            <p className={styles.summaryLoading}>
              여행지 정보를 불러오는 중입니다...
            </p>
          ) : null} */}

          <div className={styles.reviewSummary}>
            {isSummaryLoading ? (
              <p className={styles.summaryLoading}>
                리뷰 요약을 불러오는 중입니다...
              </p>
            ) : hasReviews ? (
              <>
                <div className={styles.summaryStats}>
                  <span className={styles.averageRating}>
                    {averageRatingText}
                  </span>
                  <span className={styles.totalCount}>
                    {totalReviews}개의 리뷰
                  </span>
                </div>
                {summary?.ratingDistributions?.length ? (
                  <ul className={styles.ratingDistribution}>
                    {summary.ratingDistributions.map(({ rating, count }) => (
                      <li
                        key={`${rating}-${count}`}
                        className={styles.ratingDistributionItem}
                      >
                        <span>{formatRating(rating)}점</span>
                        <span>{count}명</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {summary?.samplePhotos?.length ? (
                  <div className={styles.samplePhotos}>
                    {summary.samplePhotos.map((photo) => (
                      <div
                        key={photo.tripSpotReviewPhotoId}
                        className={styles.samplePhoto}
                      >
                        <Image
                          src={photo.photoUrl}
                          alt="리뷰 사진"
                          fill
                          sizes="64px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <p className={styles.summaryPlaceholder}>
                아직 등록된 리뷰가 없습니다.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.tabContainer}>
        <div className={styles.tabList}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`${styles.tabButton} ${
                activeTab === tab.key ? styles.activeTab : ""
              }`}
              onClick={() => handleTabChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.tabPanel}>
          {activeTab === "details" ? (
            <div className={styles.detailContent}>
              <div className={styles.infoGroup}>
                {spot.address ? (
                  <p className={styles.address}>📍 {spot.address}</p>
                ) : null}
                {spot.phoneNumber ? (
                  <p className={styles.infoItem}>☎ {spot.phoneNumber}</p>
                ) : null}
                {spot.homepageUrl ? (
                  <a
                    className={styles.infoLink}
                    href={spot.homepageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    홈페이지 바로가기
                  </a>
                ) : null}
              </div>
              {spot.description ? (
                <p className={styles.description}>{spot.description}</p>
              ) : null}
              <div className={styles.buttonRow}>
                <button className={styles.scheduleButton}>일정 만들기</button>
              </div>
            </div>
          ) : (
            <div className={styles.reviewContent}>
              <div className={styles.reviewHeader}>
                <h2 className={styles.reviewTitle}>방문자 리뷰</h2>
                <button
                  type="button"
                  className={styles.reviewButton}
                  onClick={handleOpenReviewModal}
                >
                  리뷰 작성하기
                </button>
              </div>

              {isReviewsLoading && !reviews.length ? (
                <p className={styles.summaryLoading}>
                  리뷰를 불러오는 중입니다...
                </p>
              ) : reviews.length ? (
                <ul className={styles.reviewList}>
                  {reviews.map((review) => (
                    <li
                      key={review.tripSpotReviewId}
                      className={styles.reviewCard}
                    >
                      <div className={styles.reviewMeta}>
                        <span className={styles.reviewRating}>
                          {review.rating.toFixed(1)}점
                        </span>
                        <span className={styles.reviewSource}>
                          {review.reviewSourceTypeDescription}
                        </span>
                      </div>
                      <p className={styles.reviewContentText}>
                        {review.content}
                      </p>
                      {review.photos?.length ? (
                        <div className={styles.reviewPhotos}>
                          {review.photos.map((photo) => (
                            <div
                              key={photo.tripSpotReviewPhotoId}
                              className={styles.reviewPhoto}
                            >
                              <Image
                                src={photo.photoUrl}
                                alt="리뷰 사진"
                                fill
                                sizes="96px"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.summaryPlaceholder}>
                  아직 등록된 리뷰가 없습니다.
                </p>
              )}

              {hasNextPage && reviews.length ? (
                <button
                  type="button"
                  className={styles.loadMoreButton}
                  onClick={handleLoadMore}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "불러오는 중..." : "리뷰 더 보기"}
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <TripSpotReviewModal
        tripSpotId={tripSpotId}
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        onSuccess={handleReviewCreated}
      />
    </div>
  );
}
