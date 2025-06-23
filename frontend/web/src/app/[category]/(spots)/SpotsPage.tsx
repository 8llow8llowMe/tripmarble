import type { Metadata } from "next";
// styles
import styles from "./Spots.module.scss";
// components
import HorizontalList from "@/components/common/HorizontalList/HorizontalList";
// data
import { spotsData } from "@/constants/spots";

export const metadata: Metadata = {
  title: "여행지 목록",
  description:
    "대한민국의 다양한 여행지를 둘러보세요. 인기 지역부터 숨겨진 명소까지!",
};
export default function SpotsPage() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.subTitle}>여행지 목록</div>
          <div>지금 떠나기 좋은 추천 여행지를 확인해보세요.</div>
        </div>
        <HorizontalList
          title="대한민국 여행지"
          items={spotsData}
          itemWidth={250}
          itemHeight={250}
        />
        <HorizontalList
          title="추천 여행지"
          items={spotsData}
          itemWidth={300}
          itemHeight={180}
        />
        <HorizontalList
          title="여기저기"
          items={spotsData}
          itemWidth={250}
          itemHeight={300}
        />
      </div>
    </>
  );
}
