"use client";

import { useCallback, useMemo, useState } from "react";

import useTripSpotById from "@/entities/trips/hooks/useTripSpotById";
import useTripSpotReviewSummary from "@/entities/trips/hooks/useTripSpotReviewSummary";
import useTripSpotReviews from "@/entities/trips/hooks/useTripSpotReviews";
import { TripSpotDetailResponse } from "@/entities/trips/model/tripsType";

import TripSpotReviewModal from "./TripSpotReviewModal";
import styles from "./TripSpotDetail.module.scss";
import CreateGameModal from "@/features/game/create-game/ui/CreateGameModal";
import KakaoMap from "@/shared/ui/map/KakaoMap";

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

const dummySpot: TripSpotDetailResponse[] = [
  {
    tripSpotId: 1,
    tripSpotName: "[백년가게] 신안촌",
    contentTypeName: "음식점",
    description:
      "1986년 개업의 한옥 남도음식 전문점. 홍어삼합, 연포탕, 병어조림, 계절 젓갈과 ‘낙지꾸리’ 같은 남도 토속 메뉴로 유명하다. 온라인/전화 예약이 가능하며 전라남도 출신 주인의 손맛으로 꾸준히 사랑받는 노포다.",
    homepageUrl: "http://www.신안촌.kr",
    phoneNumber: "02-725-7744",
    address: "서울특별시 종로구 사직로12길 8",
    addressDetail: "",
    longitude: 0,
    latitude: 0,
    imageUrl: "/images/no-image.png",
    originalImageUrl: "/images/no-image.png",
  },
  {
    tripSpotId: 2,
    tripSpotName: "[백년가게] 선동보리밥",
    contentTypeName: "음식점",
    description:
      "성북동에 자리한 보리밥 전문점. 채식 친화적인 한 끼로 알려져 있으며 보리밥, 영양돌솥밥, 감자전 등 담백한 메뉴로 지역 주민과 방문객에게 사랑받는다.",
    homepageUrl: "",
    phoneNumber: "02-743-2096",
    address: "서울특별시 성북구 성북로 134-4",
    addressDetail: "",
    longitude: 0,
    latitude: 0,
    imageUrl: "/images/no-image.png",
    originalImageUrl: "/images/no-image.png",
  },
  {
    tripSpotId: 3,
    tripSpotName: "[백년가게] 만포면옥",
    contentTypeName: "음식점",
    description:
      "은평구 구산역 인근의 평양냉면 노포. 메밀향 살아있는 평양냉면과 옛날불고기, 어복쟁반, 녹두지짐 등이 인기다. 넓은 좌석과 주차로 가족·모임 식사에 적합하다.",
    homepageUrl: "",
    phoneNumber: "02-389-3917",
    address: "서울특별시 은평구 연서로 171",
    addressDetail: "",
    longitude: 0,
    latitude: 0,
    imageUrl: "/images/no-image.png",
    originalImageUrl: "/images/no-image.png",
  },
  {
    tripSpotId: 4,
    tripSpotName: "[백년가게] 만석장",
    contentTypeName: "음식점",
    description:
      "두부·쌈밥으로 알려진 한식집. 파주 장단콩으로 만든 수제 두부, 쌈 채소 무한 제공, 황토가마 초벌구이 고기 등이 특징이며 야외 테라스도 운영한다. 2018년 백년가게 선정.",
    homepageUrl: "",
    phoneNumber: "02-385-2093",
    address: "서울특별시 은평구 대서문길 43-10",
    addressDetail: "",
    longitude: 0,
    latitude: 0,
    imageUrl: "/images/no-image.png",
    originalImageUrl: "/images/no-image.png",
  },
  {
    tripSpotId: 5,
    tripSpotName: "[백년가게] 대호정",
    contentTypeName: "음식점",
    description:
      "1982년부터 시흥동을 지켜온 돼지갈비 전문 노포. 육수와 양념을 직접 만들어 일관된 맛을 유지하며, 국내산 생갈비·꽃등심·생버섯불고기 등이 인기 메뉴다.",
    homepageUrl: "",
    phoneNumber: "02-808-5200",
    address: "서울특별시 금천구 시흥대로52길 51",
    addressDetail: "",
    longitude: 0,
    latitude: 0,
    imageUrl: "/images/no-image.png",
    originalImageUrl: "/images/no-image.png",
  },
];

export default function TripSpotDetail({ params }: Props) {
  const tripSpotId = params.id;

  const [activeTab, setActiveTab] = useState<TabKey>("details");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isGameCreateOpen, setIsGameCreateOpen] = useState(false);

  const {
    data: spotResponse,
    isLoading: isSpotLoading,
    isError: isSpotError,
  } = useTripSpotById(tripSpotId);

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
    const fetched = spotResponse?.data?.dataBody as
      | (Partial<TripSpotDetailResponse> & {
          originalImageUrl?: string;
          tripSpotId?: string | number;
        })
      | undefined;

    // 응답 없으면 더미 1개 사용
    if (!fetched) {
      return dummySpot[0];
    }

    // API가 문자열 id를 내려주는 케이스 대응
    const idNum =
      typeof fetched.tripSpotId === "string"
        ? Number(fetched.tripSpotId)
        : typeof fetched.tripSpotId === "number"
        ? fetched.tripSpotId
        : 0;

    // 서버 필드 우선, 누락 시 안전한 기본값 보정
    const normalized: TripSpotDetailResponse & { originalImageUrl?: string } = {
      tripSpotId: idNum,
      tripSpotName: fetched.tripSpotName ?? "",
      contentTypeName: fetched.contentTypeName ?? "",
      description: fetched.description ?? "",
      homepageUrl: fetched.homepageUrl ?? "",
      phoneNumber: fetched.phoneNumber ?? "",
      address: fetched.address ?? "",
      addressDetail: fetched.addressDetail ?? "",
      longitude: (fetched as any).longitude ?? 0,
      latitude: (fetched as any).latitude ?? 0,
      imageUrl: (fetched as any).imageUrl ?? "/images/no-image.png",
      originalImageUrl:
        (fetched as any).originalImageUrl ??
        (fetched as any).imageUrl ??
        "/images/no-image.png",
    };

    return normalized;
  }, [spotResponse]);

  const coverImage =
    spot.originalImageUrl || spot.imageUrl || "/images/no-image.png";

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

  const handleOpenGameCreate = useCallback(() => {
    setIsGameCreateOpen(true);
  }, []);

  const handleCloseGameCreate = useCallback(() => {
    setIsGameCreateOpen(false);
  }, []);

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
          <img
            src={coverImage}
            alt={`${spot.tripSpotName} 대표 이미지`}
            className={styles.heroImage}
            loading="eager"
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
                {/* {summary?.ratingDistributions?.length ? (
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
                ) : null} */}
                {summary?.samplePhotos?.length ? (
                  <div className={styles.samplePhotos}>
                    {summary.samplePhotos.map((photo) => (
                      <div
                        key={photo.tripSpotReviewPhotoId}
                        className={styles.samplePhoto}
                      >
                        <img
                          src={photo.photoUrl}
                          alt="리뷰 사진"
                          className={styles.squareImage}
                          loading="lazy"
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

              {typeof spot.latitude === "number" &&
              typeof spot.longitude === "number" &&
              (spot.latitude !== 0 || spot.longitude !== 0) ? (
                <div className={styles.mapWrapper}>
                  <KakaoMap
                    center={{ lat: spot.latitude, lng: spot.longitude }}
                    level={5}
                  />
                </div>
              ) : null}

              <div className={styles.buttonRow}>
                <button
                  className={styles.scheduleButton}
                  onClick={handleOpenGameCreate}
                >
                  일정 만들기
                </button>
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
                              <img
                                src={photo.photoUrl}
                                alt="리뷰 사진"
                                className={styles.squareImage}
                                loading="lazy"
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
      <CreateGameModal
        isOpen={isGameCreateOpen}
        onClose={handleCloseGameCreate}
      />
    </div>
  );
}
