"use client";

import { useMemo } from "react";
// styles
import styles from "./SpotsList.module.scss";
import noImage from "/public/images/no-image.png";
// components
import HorizontalList from "@/shared/ui/common/HorizontalList/HorizontalList";
// data
import { spotsData } from "@/shared/constants/spots";
// api
import useRepresentativeRegions from "@/entities/trips/hooks/useRepresentativeRegions";

export default function Spots() {
  const { data } = useRepresentativeRegions();

  const representativeRegions = useMemo(() => {
    if (!data?.data?.dataBody) return [];
    return data.data.dataBody.map(
      (region: {
        representativeRegionId: number;
        representativeRegionName: string;
        representativeRegionImageUrl: string | null;
      }) => ({
        id: region.representativeRegionId,
        name: region.representativeRegionName,
        imgUrl: region.representativeRegionImageUrl || noImage.src,
      })
    );
  }, [data]);

  return (
    <>
      <div className={styles.spotsWrapper}>
        <div className={styles.hero}>
          <div className={styles.section}>
            <div className={styles.subTitle}>여행지 목록</div>
            <div>지금 떠나기 좋은 추천 여행지를 확인해보세요.</div>
          </div>
        </div>
        <div className={`appPage ${styles.lists}`}>
          <HorizontalList
            title="대한민국 여행지"
            items={[...representativeRegions, ...representativeRegions]}
            baseHref="/spots"
            itemWidth={240}
            itemHeight={360}
          />
          {/* <HorizontalList
            title="추천 여행지"
            items={[...spotsData, ...spotsData]}
            baseHref="/trip-spots"
            itemWidth={300}
            itemHeight={180}
          /> */}
          <HorizontalList
            title="추천 여행지"
            items={[...spotsData, ...spotsData]}
            baseHref="/trip-spots"
            itemWidth={300}
            itemHeight={300}
          />
        </div>
      </div>
    </>
  );
}
