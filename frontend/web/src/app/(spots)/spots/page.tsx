"use client";

// styles
import styles from "./SpotsList.module.scss";
import noImage from "/public/images/no-image.png";
// components
import HorizontalList from "@/shared/ui/common/HorizontalList/HorizontalList";
// data
import { spotsData } from "@/shared/constants/spots";
// api
import { useRepresentativeRegions } from "@/entities/trips/hooks/useTrips";
import { useMemo } from "react";
import { StaticImageData } from "next/image";

// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "여행지 목록",
//   description:
//     "대한민국의 다양한 여행지를 둘러보세요. 인기 지역부터 숨겨진 명소까지!",
// };

export default function Spots() {
  const { data } = useRepresentativeRegions();
  const representativeRegions = useMemo(() => {
    if (!data?.data?.dataBody) return [];
    return data.data.dataBody.map(
      (region: {
        representativeRegionId: number;
        representativeRegionName: string;
        imageUrl: string | StaticImageData | null;
      }) => ({
        id: region.representativeRegionId,
        name: region.representativeRegionName,
        imgUrl: region.imageUrl || noImage,
      })
    );
  }, [data]);

  return (
    <>
      {/* <div className={styles.spotsWrapper}> */}
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.subTitle}>여행지 목록</div>
          <div>지금 떠나기 좋은 추천 여행지를 확인해보세요.</div>
        </div>
      </div>
      <div className={styles.lists}>
        <HorizontalList
          title="대한민국 여행지"
          items={representativeRegions}
          baseHref="/spots"
          itemWidth={250}
          itemHeight={250}
        />
        <HorizontalList
          title="추천 여행지"
          items={spotsData}
          baseHref="/spots"
          itemWidth={300}
          itemHeight={180}
        />
        <HorizontalList
          title="여기저기"
          items={spotsData}
          baseHref="/spots"
          itemWidth={250}
          itemHeight={300}
        />
      </div>
      {/* </div> */}
    </>
  );
}
