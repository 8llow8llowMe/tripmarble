"use client";

// styles
import styles from "./Search.module.scss";
// components
import Input from "@/shared/ui/common/Input/Input";
import CircleList from "@/shared/ui/common/CircleList/CircleList";
import useRepresentativeRegions from "@/entities/trips/hooks/useRepresentativeRegions";
import KakaoMap from "@/shared/ui/map/KakaoMap";

// export const metadata: Metadata = {
//   title: "Search",
//   description: "원하는 여행지를 검색해보세요",
// };
export default function Search() {
  const { data } = useRepresentativeRegions();
  const items = (data?.data?.dataBody || []).map(
    (r: {
      representativeRegionId: number;
      representativeRegionName: string;
      representativeRegionImageUrl: string | null;
    }) => ({
      id: r.representativeRegionId,
      name: r.representativeRegionName,
      imgUrl: r.representativeRegionImageUrl || "/images/no-image.png",
    })
  );
  return (
    <div className={`appPage ${styles.container}`}>
      <div className={styles.section}>
        <div className={styles.subTitle}>원하는 여행지를 검색해보세요!</div>
        <Input />
      </div>
      <div className={styles.section}>
        <div className={styles.subTitle}>지도로 둘러보기</div>
        <div className={styles.mapWrapper}>
          <KakaoMap className={styles.mapCanvas} height={"40vh"} />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.subTitle}>추천 여행지</div>
        <CircleList baseHref="/spots" items={items} />
      </div>
    </div>
  );
}
