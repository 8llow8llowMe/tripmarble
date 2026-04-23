import type { RefObject } from "react";
import { seoul2 } from "@/shared/assets/images/places";
import Button from "@/shared/ui/common/Button/Button";
import MediaCard from "@/shared/ui/common/Card/MediaCard";
import Filter from "@/shared/ui/common/Filter/Filter";
import { FilterOption } from "@/shared/ui/common/Filter/types";
import type { TripSpot } from "@/entities/trips/hooks/useTripSpotsByRepresentativeRegion";
import { toImageSrc } from "./spotDetailUtils";
import styles from "./Spot.module.scss";

type RegionInfo = {
  representativeRegionImageUrl?: string | null;
  representativeRegionName?: string | null;
};

type SpotListPanelProps = {
  listPanelRef: RefObject<HTMLDivElement>;
  listContainerRef: RefObject<HTMLDivElement>;
  observerRef: RefObject<HTMLDivElement>;
  region?: RegionInfo;
  regionDescriptionText: string;
  hasRegionDescription: boolean;
  isRegionDescOpen: boolean;
  filterOptions: FilterOption[];
  effectiveFilterSelection: string[];
  spots: TripSpot[];
  selectedSpotId: string | null;
  isSpotsLoading: boolean;
  isSpotsError: boolean;
  isFetchingNextSpotPage: boolean;
  hasNextSpotPage?: boolean;
  onRegionDescOpen: () => void;
  onRegionDescClose: () => void;
  onFilterChange: (ids: string[]) => void;
  onSpotClick: (spotId: string | number) => void;
  onRetrySpots: () => void;
};

export default function SpotListPanel({
  listPanelRef,
  listContainerRef,
  observerRef,
  region,
  regionDescriptionText,
  hasRegionDescription,
  isRegionDescOpen,
  filterOptions,
  effectiveFilterSelection,
  spots,
  selectedSpotId,
  isSpotsLoading,
  isSpotsError,
  isFetchingNextSpotPage,
  hasNextSpotPage,
  onRegionDescOpen,
  onRegionDescClose,
  onFilterChange,
  onSpotClick,
  onRetrySpots,
}: SpotListPanelProps) {
  return (
    <aside className={styles.listPanel} ref={listPanelRef}>
      <div className={styles.regionSummary}>
        <img
          src={region?.representativeRegionImageUrl || toImageSrc(seoul2)}
          alt={region?.representativeRegionName || "대표 지역 이미지"}
          className={styles.regionImage}
          loading="eager"
        />
        <div className={styles.regionText}>
          <div className={styles.regionHeader}>
            <h2 className={styles.regionTitle}>
              {region?.representativeRegionName || "대표 지역"}
            </h2>
            {hasRegionDescription && !isRegionDescOpen && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className={styles.inlineToggle}
                onClick={onRegionDescOpen}
                aria-expanded="false"
              >
                자세히
              </Button>
            )}
          </div>

          {hasRegionDescription && isRegionDescOpen && (
            <>
              <p className={styles.regionDescription}>
                {regionDescriptionText}
              </p>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className={styles.blockToggle}
                onClick={onRegionDescClose}
                aria-expanded="true"
              >
                닫기
              </Button>
            </>
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        {filterOptions.length > 0 && (
          <Filter
            options={filterOptions}
            selected={effectiveFilterSelection}
            onChange={onFilterChange}
          />
        )}
      </div>

      <div className={styles.listContent} ref={listContainerRef}>
        {spots.map((spot) => {
          const spotKey = String(spot.tripSpotId ?? "");
          const isActive = spotKey === (selectedSpotId ?? "");
          return (
            <button
              type="button"
              key={spotKey}
              className={`${styles.listItem} ${
                isActive ? styles.listItemActive : ""
              }`}
              data-spot-id={spotKey}
              onClick={() => onSpotClick(spotKey)}
              aria-current={isActive ? "true" : undefined}
            >
              <MediaCard
                imageUrl={spot.originalImageUrl || "/images/no-image.png"}
                imageAlt={spot.tripSpotName}
                title={spot.tripSpotName}
                meta="지도에서 보기"
                ratio="wide"
                interactive
                className={styles.listItemCard}
              />
            </button>
          );
        })}

        {isSpotsLoading && !spots.length && (
          <div className={styles.listState}>
            <p className={styles.listStateTitle}>여행지를 불러오는 중입니다.</p>
            <p className={styles.listStateText}>
              지도와 목록을 준비하고 있습니다.
            </p>
          </div>
        )}

        {isSpotsError && !spots.length && (
          <div className={styles.listState} role="alert">
            <p className={styles.listStateTitle}>
              여행지 목록을 불러오지 못했습니다.
            </p>
            <p className={styles.listStateText}>
              네트워크 상태를 확인한 뒤 다시 시도해 주세요.
            </p>
            <Button variant="secondary" size="sm" onClick={onRetrySpots}>
              다시 시도
            </Button>
          </div>
        )}

        {!isSpotsLoading && !isSpotsError && !spots.length && (
          <div className={styles.listState}>
            <p className={styles.listStateTitle}>
              조건에 맞는 여행지가 없습니다.
            </p>
            <p className={styles.listStateText}>
              필터를 바꾸거나 전체 목록을 확인해 주세요.
            </p>
          </div>
        )}

        <div ref={observerRef} className={styles.listSentinel} />
        {isFetchingNextSpotPage && (
          <p className={styles.listLoader}>여행지를 불러오는 중입니다...</p>
        )}
        {!hasNextSpotPage && spots.length > 0 && (
          <p className={styles.listEnd}>모든 여행지를 둘러봤어요.</p>
        )}
      </div>
    </aside>
  );
}
