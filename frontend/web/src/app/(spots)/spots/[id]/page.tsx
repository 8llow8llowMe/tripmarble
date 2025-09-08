"use client";
import { useEffect, useRef, useState } from "react";
// import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { seoul2 } from "@/shared/assets/images/places";
// style
import styles from "./Spot.module.scss";
// api
import useTripContentTypes from "@/entities/trips/hooks/useTripContentTypes";
import useRepresentativeRegion from "@/entities/trips/hooks/useRepresentativeRegion";
import useTripSpotsByRepresentativeRegion from "@/entities/trips/hooks/useTripSpotsByRepresentativeRegion";
// component
import Filter from "@/shared/ui/common/Filter/Filter";

type Props = {
  params: {
    id: string;
  };
};

export default function SpotDetail({ params }: Props) {
  const observerRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTripSpotsByRepresentativeRegion(String(params.id), selectedFilter);
  // filter
  const { data: filterData } = useTripContentTypes();
  // 대표 여행지 상세 정보
  const { data: regionRes, isLoading: regionLoading } = useRepresentativeRegion(
    params.id
  );
  const region = regionRes?.data?.dataBody;

  useEffect(() => {
    if (
      !observerRef.current ||
      !data?.pages[data.pages.length - 1].data.dataBody.hasNext
    )
      return;

    const observer = new IntersectionObserver(([entry]) => {
      if (
        entry.isIntersecting &&
        data?.pages[data.pages.length - 1].data.dataBody.hasNext
      ) {
        fetchNextPage();
      }
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [data?.pages, fetchNextPage]);

  return (
    <>
      <div className={styles.spotContainer}>
        <section className={styles.spotHeader}>
          <div className={styles.mainImageWrapper}>
            <Image
              src={region?.representativeRegionImageUrl || seoul2}
              alt="spot-main-image"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 8rem"
              className={styles.mainImage}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.regionContent}>
            <h2>{region?.representativeRegionName || "지역 정보"}</h2>
            <p>
              {regionLoading
                ? "지역 정보를 불러오는 중..."
                : region?.description || "해당 지역에 대한 설명을 여기에 표시"}
            </p>
          </div>
        </section>

        <section className={styles.spotFilter}>
          {filterData?.data.dataBody && (
            <Filter
              options={filterData?.data.dataBody}
              selected={selectedFilter}
              onChange={setSelectedFilter}
            />
          )}
        </section>

        <section className={styles.contentGrid}>
          {/* {dummyData.map((spot) => ( */}
          {data?.pages.flatMap((page) =>
            page.data.dataBody.contents.map((spot) => (
              <Link
                key={spot.tripSpotId}
                href={`/trip-spots/${spot.tripSpotId}`}
              >
                <div className={styles.contentCard}>
                  <div className={styles.cardImage}>
                    <Image
                      src={spot.originalImageUrl || "/images/no-image.png"}
                      alt={spot.tripSpotName}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 15rem"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <p className={styles.cardTitle}>{spot.tripSpotName}</p>
                </div>
              </Link>
            ))
          )}
          <div ref={observerRef} />
          {isFetchingNextPage && <p>불러오는 중...</p>}
        </section>
      </div>
    </>
  );
}
