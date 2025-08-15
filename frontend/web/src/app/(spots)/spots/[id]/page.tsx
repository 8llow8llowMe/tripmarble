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
// component
import Filter from "@/shared/ui/common/Filter/Filter";
import useTripSpotsByRepresentativeRegion from "@/entities/trips/hooks/useTripSpotsByRepresentativeRegion";

type Props = {
  params: {
    id: string;
  };
};

export default function SpotDetail({ params }: Props) {
  // const { id: spotId } = useParams();
  // const dummyData = [
  //   {
  //     tripSpotId: 50693,
  //     contentId: 2609624,
  //     tripSpotName: "[백년가게]온천입구기장곰장어",
  //     originalImageUrl: "",
  //   },
  //   {
  //     tripSpotId: 50692,
  //     contentId: 2563357,
  //     tripSpotName: "[백년가게]옥미아구찜",
  //     originalImageUrl: "",
  //   },
  //   {
  //     tripSpotId: 50691,
  //     contentId: 2605849,
  //     tripSpotName: "[백년가게]언양한우불고기",
  //     originalImageUrl:
  //       "http://tong.visitkorea.or.kr/cms/resource/68/2606468_image2_1.JPG",
  //   },
  //   {
  //     tripSpotId: 50689,
  //     contentId: 2609601,
  //     tripSpotName: "[백년가게]신흥장어",
  //     originalImageUrl:
  //       "http://tong.visitkorea.or.kr/cms/resource/90/2609790_image2_1.JPG",
  //   },
  //   {
  //     tripSpotId: 50687,
  //     contentId: 2609183,
  //     tripSpotName: "[백년가게]신포순대",
  //     originalImageUrl: "",
  //   },
  //   {
  //     tripSpotId: 50685,
  //     contentId: 2608933,
  //     tripSpotName: "[백년가게]신안촌",
  //     originalImageUrl:
  //       "http://tong.visitkorea.or.kr/cms/resource/26/2609026_image2_1.JPG",
  //   },
  //   {
  //     tripSpotId: 50684,
  //     contentId: 2616274,
  //     tripSpotName: "[백년가게]신동양",
  //     originalImageUrl:
  //       "http://tong.visitkorea.or.kr/cms/resource/30/2616330_image2_1.jpg",
  //   },
  //   {
  //     tripSpotId: 50683,
  //     contentId: 2563226,
  //     tripSpotName: "[백년가게]스미센",
  //     originalImageUrl:
  //       "http://tong.visitkorea.or.kr/cms/resource/81/2563281_image2_1.jpg",
  //   },
  //   {
  //     tripSpotId: 50682,
  //     contentId: 2563237,
  //     tripSpotName: "[백년가게]쉐라미",
  //     originalImageUrl:
  //       "http://tong.visitkorea.or.kr/cms/resource/26/2563326_image2_1.jpg",
  //   },
  //   {
  //     tripSpotId: 50679,
  //     contentId: 2609645,
  //     tripSpotName: "[백년가게]선동보리밥",
  //     originalImageUrl:
  //       "http://tong.visitkorea.or.kr/cms/resource/12/2609812_image2_1.jpg",
  //   },
  // ];

  const observerRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTripSpotsByRepresentativeRegion(String(params.id), selectedFilter);
  // filter
  const { data: filterData } = useTripContentTypes();

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
              src={seoul2}
              alt="spot-main-image"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 8rem"
              className={styles.mainImage}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.regionContent}>
            <h2>대한민국 지역</h2>
            <p>해당 지역에 대한 설명을 여기에 표시</p>
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
