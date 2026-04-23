"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import useTripSpotById from "@/entities/trips/hooks/useTripSpotById";
import useTripSpotReviews from "@/entities/trips/hooks/useTripSpotReviews";
import type { TripSpotDetailResponse } from "@/entities/trips/model/tripsType";
import Modal from "@/shared/ui/common/Modal";
import styles from "./MissionModal.module.scss";
import type { TripGameTileView } from "@/entities/games/model/gameInfoDummy";
import KakaoMap from "@/shared/ui/map/KakaoMap";
import Button from "@/shared/ui/common/Button/Button";

type Props = {
  tile: TripGameTileView | null;
  isOpen: boolean;
  allowMission: boolean;
  onClose: () => void;
  onSubmitReview: (params: {
    rating: number;
    content: string;
    files?: File[];
  }) => Promise<void> | void;
  onSkip: () => Promise<void> | void;
  onFail: () => Promise<void> | void;
  submitting?: boolean;
  skipping?: boolean;
  failing?: boolean;
  onRequestEndGame?: () => void;
};

export default function MissionModal({
  tile,
  isOpen,
  onClose,
  allowMission,
  onSubmitReview,
  onSkip,
  onFail,
  submitting,
  skipping,
  failing,
}: Props) {
  const MAX_FILES = 5;
  const [tab, setTab] = useState<"info" | "mission">(
    allowMission ? "mission" : "info"
  );
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const missionRef = useRef<HTMLDivElement | null>(null);
  const [fixedHeight, setFixedHeight] = useState<number | undefined>(undefined);

  // 모달이 닫힐 때 입력값 초기화
  useEffect(() => {
    if (!isOpen) {
      setRating(0);
      setContent("");
      setFiles([]);
    }
  }, [isOpen]);

  // 여행지 상세 정보: tile의 tripSpotId로 조회하여 표시 (tile 필드가 비어있는 경우 대응)
  const tripSpotId = tile?.tripSpotId ? String(tile.tripSpotId) : "";
  const { data: spotResponse } = useTripSpotById(tripSpotId);

  const spotDetail = useMemo(() => {
    const fetched = spotResponse?.data?.dataBody as
      | (Partial<TripSpotDetailResponse> & {
          originalImageUrl?: string;
          tripSpotId?: string | number;
        })
      | undefined;

    if (!fetched) return undefined;

    const idNum =
      typeof fetched.tripSpotId === "string"
        ? Number(fetched.tripSpotId)
        : typeof fetched.tripSpotId === "number"
        ? fetched.tripSpotId
        : 0;

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

  const coverImage = useMemo(() => {
    return spotDetail?.originalImageUrl || spotDetail?.imageUrl || undefined;
  }, [spotDetail]);

  const {
    data: reviewPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isReviewsLoading,
  } = useTripSpotReviews(tripSpotId);

  const reviews = useMemo(
    () =>
      reviewPages?.pages.flatMap((page) => page.data.dataBody.contents) ?? [],
    [reviewPages]
  );

  const onAddFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    if (incoming.length === 0) return;
    setFiles((prev) => {
      const room = MAX_FILES - prev.length;
      const next = room > 0 ? prev.concat(incoming.slice(0, room)) : prev;
      return next;
    });
  };

  const removeAt = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const canSubmit = useMemo(
    () => allowMission && rating > 0 && content.trim().length >= 20,
    [allowMission, rating, content]
  );

  // 미션 탭 콘텐츠 높이를 측정하여 본문 최소 높이로 고정
  useEffect(() => {
    if (!isOpen) return;
    const measure = () => {
      const h = missionRef.current?.scrollHeight ?? 0;
      if (h > 0) setFixedHeight(h);
    };
    // 첫 렌더 이후 한 프레임 뒤 측정 (레이아웃 안정화)
    const id = requestAnimationFrame(measure);
    // 리사이즈 시에도 재측정
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, [isOpen, allowMission, tile]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={tile?.tripSpotName ?? "미션 상세"}
      size="lg"
      panelClassName={styles.modalPanel}
      bodyClassName={styles.modalBody}
    >
      <div className={styles.sheet}>
        <div className={styles.header}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabBtn} ${
                tab === "info" ? styles.tabActive : ""
              }`}
              onClick={() => setTab("info")}
            >
              정보
            </button>
            <button
              className={`${styles.tabBtn} ${
                tab === "mission" ? styles.tabActive : ""
              }`}
              onClick={() => setTab("mission")}
              disabled={!allowMission}
            >
              미션 인증
            </button>
          </div>
        </div>

        <div
          className={styles.body}
          style={fixedHeight ? { minHeight: fixedHeight } : undefined}
          ref={bodyRef}
        >
          {/* 미션 탭 패널 (항상 렌더링, 비활성 시 화면 밖에서 측정) */}
          <div
            ref={missionRef}
            className={`${styles.tabPanel} ${
              tab === "mission" ? styles.tabVisible : styles.tabHidden
            }`}
          >
            <div>
              <div className={styles.row}>
                <div className={styles.label}>별점*</div>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={`${styles.star} ${
                        n <= rating ? styles.starActive : ""
                      }`}
                      onClick={() => setRating(n)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>리뷰(최소 20자)*</div>
                <textarea
                  className={styles.textarea}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="여기에 방문 후기를 작성해주세요."
                />
              </div>
              <div className={styles.row}>
                <div className={styles.label}>사진 첨부 (최대 5장)</div>
                <div className={styles.uploadGrid}>
                  {files.map((f, i) => {
                    const url = URL.createObjectURL(f);
                    return (
                      <div key={i} className={styles.thumb}>
                        <img
                          src={url}
                          alt={`uploaded-${i}`}
                          className={styles.thumbImg}
                          loading="lazy"
                          onLoad={() => URL.revokeObjectURL(url)}
                        />
                        <button
                          type="button"
                          className={styles.removeBtn}
                          onClick={() => removeAt(i)}
                          aria-label="사진 삭제"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                  {files.length < MAX_FILES && (
                    <label className={styles.uploadTile} aria-label="사진 추가">
                      +
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        style={{ display: "none" }}
                        onChange={(e) => {
                          onAddFiles(e.target.files);
                          e.currentTarget.value = "";
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
              <div className={styles.footer}>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  className={`${styles.primary} ${
                    !canSubmit || submitting ? styles.disabled : ""
                  }`}
                  disabled={!canSubmit || submitting}
                  onClick={async () => {
                    if (!canSubmit) return;
                    await onSubmitReview({ rating, content, files });
                  }}
                >
                  {submitting ? "제출 중…" : "제출"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  className={`${styles.secondary} ${
                    skipping ? styles.disabled : ""
                  }`}
                  disabled={!!skipping}
                  onClick={() => onSkip()}
                >
                  {skipping ? "건너뛰는 중…" : "건너뛰기"}
                </Button>
              </div>
            </div>
          </div>

          {/* 정보 탭 패널 */}
          <div
            className={`${styles.tabPanel} ${
              tab === "info" ? styles.tabVisible : styles.tabHidden
            }`}
          >
            <div>
              {coverImage ? (
                <div className={styles.coverImageBox}>
                  <img
                    src={coverImage}
                    alt={`${spotDetail?.tripSpotName ?? "여행지"} 대표 이미지`}
                    className={styles.coverImage}
                    loading="lazy"
                  />
                </div>
              ) : null}

              {/* 방문자 리뷰 섹션 */}
              <div className={styles.reviewsSection}>
                <div className={styles.reviewsHeader}>
                  <h3 className={styles.reviewsTitle}>방문자 리뷰</h3>
                  {hasNextPage && reviews.length ? (
                    <button
                      type="button"
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      className={styles.reviewsMoreBtn}
                    >
                      {isFetchingNextPage ? "불러오는 중…" : "더 보기"}
                    </button>
                  ) : null}
                </div>

                {isReviewsLoading && !reviews.length ? (
                  <p className={styles.reviewsLoading}>
                    리뷰를 불러오는 중입니다…
                  </p>
                ) : reviews.length ? (
                  <ul className={styles.reviewsList}>
                    {reviews.map((review: any) => (
                      <li
                        key={review.tripSpotReviewId}
                        className={styles.reviewItem}
                      >
                        <div className={styles.reviewMeta}>
                          <span style={{ fontWeight: 700 }}>
                            {review.rating?.toFixed
                              ? review.rating.toFixed(1)
                              : review.rating}
                            점
                          </span>
                          <span>{review.reviewSourceTypeDescription}</span>
                        </div>
                        {review.content ? (
                          <p className={styles.reviewContent}>
                            {review.content}
                          </p>
                        ) : null}
                        {review.photos?.length ? (
                          <div className={styles.reviewPhotos}>
                            {review.photos.map((photo: any) => (
                              <div
                                key={photo.tripSpotReviewPhotoId}
                                className={styles.reviewPhoto}
                              >
                                <img
                                  src={photo.photoUrl}
                                  alt="리뷰 사진"
                                  className={styles.reviewPhotoImg}
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
                  <p className={styles.reviewsEmpty}>
                    아직 등록된 리뷰가 없습니다.
                  </p>
                )}
              </div>
              <div style={{ marginTop: 16 }}>
                {spotDetail?.address ? (
                  <div className={styles.row}>
                    <div className={styles.label}>주소</div>
                    <div>{spotDetail?.address}</div>
                  </div>
                ) : null}

                {spotDetail?.phoneNumber ? (
                  <div className={styles.row}>
                    <div className={styles.label}>전화</div>
                    <div>{spotDetail?.phoneNumber}</div>
                  </div>
                ) : null}

                {spotDetail?.homepageUrl ? (
                  <div className={styles.row}>
                    <div className={styles.label}>홈페이지</div>
                    <a
                      href={spotDetail?.homepageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.infoLink}
                    >
                      바로가기
                    </a>
                  </div>
                ) : null}

                {spotDetail?.description ? (
                  <div className={styles.row}>
                    <div className={styles.label}>설명</div>
                    <div style={{ whiteSpace: "pre-wrap" }}>
                      {spotDetail?.description}
                    </div>
                  </div>
                ) : null}

                {typeof spotDetail?.latitude === "number" &&
                typeof spotDetail?.longitude === "number" &&
                (spotDetail.latitude !== 0 || spotDetail.longitude !== 0) ? (
                  <div className={styles.mapFrame}>
                    <KakaoMap
                      center={{
                        lat: spotDetail?.latitude as number,
                        lng: spotDetail?.longitude as number,
                      }}
                      level={6}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
