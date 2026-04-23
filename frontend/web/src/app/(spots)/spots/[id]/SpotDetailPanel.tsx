import type { RefObject } from "react";
import Button from "@/shared/ui/common/Button/Button";
import MediaCard from "@/shared/ui/common/Card/MediaCard";
import { TripSpotDetailResponse } from "@/entities/trips/model/tripsType";
import { formatRating } from "./spotDetailUtils";
import styles from "./Spot.module.scss";

type TabKey = "details" | "reviews";

type ReviewPhoto = {
  tripSpotReviewPhotoId?: string | number;
  photoUrl: string;
};

type ReviewItem = {
  tripSpotReviewId: string | number;
  content: string;
  rating: number;
  reviewSourceTypeDescription?: string;
  photos?: ReviewPhoto[];
};

type ReviewSummary = {
  totalCount?: number;
  averageRating?: number;
  ratingDistributions?: { rating: number; count: number }[];
  samplePhotos?: ReviewPhoto[];
};

type SpotDetailPanelProps = {
  selectedSpotId: string | null;
  detailContentRef?: RefObject<HTMLDivElement>;
  heroImage: string;
  displayName: string;
  displayDetail: TripSpotDetailResponse;
  isDetailLoading: boolean;
  isDetailError: boolean;
  hasContactInfo: boolean;
  descriptionText: string;
  summary?: ReviewSummary;
  isSummaryLoading: boolean;
  hasReviews: boolean;
  averageRatingText: string;
  totalReviews: number;
  activeTab: TabKey;
  reviews: ReviewItem[];
  isReviewsLoading: boolean;
  hasNextReviewPage?: boolean;
  isFetchingNextReviewPage: boolean;
  showCloseButton?: boolean;
  showReviewSummary?: boolean;
  placeholder?: string;
  onClose?: () => void;
  onTabChange: (tab: TabKey) => void;
  onOpenReviewModal: () => void;
  onOpenGameCreate: () => void;
  onLoadMoreReviews: () => void;
};

export default function SpotDetailPanel({
  selectedSpotId,
  detailContentRef,
  heroImage,
  displayName,
  displayDetail,
  isDetailLoading,
  isDetailError,
  hasContactInfo,
  descriptionText,
  summary,
  isSummaryLoading,
  hasReviews,
  averageRatingText,
  totalReviews,
  activeTab,
  reviews,
  isReviewsLoading,
  hasNextReviewPage,
  isFetchingNextReviewPage,
  showCloseButton = false,
  showReviewSummary = true,
  placeholder = "목록에서 여행지를 선택하면 상세 정보를 볼 수 있어요.",
  onClose,
  onTabChange,
  onOpenReviewModal,
  onOpenGameCreate,
  onLoadMoreReviews,
}: SpotDetailPanelProps) {
  if (!selectedSpotId) {
    return (
      <div className={styles.detailContent}>
        <div className={styles.detailPlaceholder}>
          <p className={styles.detailPlaceholderTitle}>여행지를 선택하세요.</p>
          <p>{placeholder}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.detailContent} ref={detailContentRef}>
      {showCloseButton && (
        <button
          type="button"
          className={styles.detailCloseBtn}
          onClick={onClose}
          aria-label="닫기"
          title="닫기"
        >
          ×
        </button>
      )}

      <div className={styles.detailHero}>
        <img src={heroImage} alt={displayName} loading="lazy" />
      </div>

      <div className={styles.detailPrimary}>
        {displayDetail?.contentTypeName ? (
          <span className={styles.detailBadge}>
            {displayDetail.contentTypeName}
          </span>
        ) : null}
        <h3 className={styles.detailTitle}>{displayName}</h3>
      </div>

      {isDetailLoading && (
        <p className={styles.detailHint}>상세 정보를 불러오는 중입니다...</p>
      )}

      {isDetailError && (
        <p className={styles.detailWarning} role="alert">
          상세 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      )}

      {showReviewSummary && (
        <div className={styles.reviewSummary}>
          {isSummaryLoading ? (
            <p className={styles.summaryPlaceholder}>
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
                  {summary.samplePhotos.map((photo, index) => (
                    <div
                      key={photo.tripSpotReviewPhotoId ?? photo.photoUrl}
                      className={styles.samplePhoto}
                    >
                      <img
                        src={photo.photoUrl}
                        alt={`리뷰 사진 ${index + 1}`}
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
      )}

      <div className={styles.tabSection}>
        <div className={styles.tabList}>
          <button
            type="button"
            className={`${styles.tabButton} ${
              activeTab === "details" ? styles.activeTab : ""
            }`}
            onClick={() => onTabChange("details")}
          >
            정보
          </button>
          <button
            type="button"
            className={`${styles.tabButton} ${
              activeTab === "reviews" ? styles.activeTab : ""
            }`}
            onClick={() => onTabChange("reviews")}
          >
            리뷰
          </button>
        </div>

        <div className={styles.tabPanel}>
          {activeTab === "details" ? (
            <div className={styles.detailInfo}>
              {displayDetail && hasContactInfo ? (
                <div className={styles.infoGroup}>
                  {displayDetail.address && (
                    <p className={styles.infoRow}>
                      <span className={styles.infoLabel}>주소</span>
                      <span className={styles.infoValue}>
                        {displayDetail.address}
                        {displayDetail.addressDetail
                          ? ` ${displayDetail.addressDetail}`
                          : ""}
                      </span>
                    </p>
                  )}
                  {displayDetail.phoneNumber && (
                    <p className={styles.infoRow}>
                      <span className={styles.infoLabel}>연락처</span>
                      <span className={styles.infoValue}>
                        <a href={`tel:${displayDetail.phoneNumber}`}>
                          {displayDetail.phoneNumber}
                        </a>
                      </span>
                    </p>
                  )}
                  {displayDetail.homepageUrl && (
                    <p className={styles.infoRow}>
                      <span className={styles.infoLabel}>홈페이지</span>
                      <span className={styles.infoValue}>
                        <a
                          href={displayDetail.homepageUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {displayDetail.homepageUrl}
                        </a>
                      </span>
                    </p>
                  )}
                </div>
              ) : (
                <p className={styles.infoPlaceholder}>
                  {isDetailLoading
                    ? "추가 정보를 불러오는 중입니다..."
                    : "등록된 연락처 정보가 없습니다."}
                </p>
              )}

              <p className={styles.detailDescription}>{descriptionText}</p>

              <div className={styles.detailActions}>
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={onOpenGameCreate}
                  disabled={isDetailLoading || isDetailError}
                >
                  일정 만들기
                </Button>
              </div>
            </div>
          ) : (
            <div className={styles.reviewContent}>
              <div className={styles.reviewHeader}>
                <h4 className={styles.reviewTitle}>방문자 리뷰</h4>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={onOpenReviewModal}
                >
                  리뷰 작성하기
                </Button>
              </div>

              {isReviewsLoading && !reviews.length ? (
                <p className={styles.summaryPlaceholder}>
                  리뷰를 불러오는 중입니다...
                </p>
              ) : reviews.length ? (
                <ul className={styles.reviewList}>
                  {reviews.map((review) => (
                    <li
                      key={review.tripSpotReviewId}
                      className={styles.reviewItem}
                    >
                      <MediaCard
                        imageUrl={
                          review.photos?.[0]?.photoUrl || "/images/no-image.png"
                        }
                        imageAlt="리뷰 사진"
                        title={review.content}
                        badge={`${review.rating.toFixed(1)}점`}
                        meta={review.reviewSourceTypeDescription}
                        action={
                          review.photos?.length
                            ? `${review.photos.length}장`
                            : undefined
                        }
                        ratio="wide"
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles.reviewEmpty}>
                  <p className={styles.listStateTitle}>
                    아직 등록된 리뷰가 없습니다.
                  </p>
                  <p className={styles.listStateText}>
                    첫 방문 기록을 남겨보세요.
                  </p>
                </div>
              )}

              {hasNextReviewPage && reviews.length ? (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className={styles.loadMoreButton}
                  onClick={onLoadMoreReviews}
                  disabled={isFetchingNextReviewPage}
                  isLoading={isFetchingNextReviewPage}
                >
                  리뷰 더 보기
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
