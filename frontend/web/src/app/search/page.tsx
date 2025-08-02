import type { Metadata } from "next";
// styles
import styles from "./Search.module.scss";
// components
import Input from "@/shared/ui/common/Input/Input";
import CircleList from "@/shared/ui/common/CircleList/CircleList";
import { spotsData } from "@/shared/constants/spots";

export const metadata: Metadata = {
  title: "Search",
  description: "원하는 여행지를 검색해보세요",
};
export default function Search() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.subTitle}>원하는 여행지를 검색해보세요!</div>
          <Input />
        </div>

        <div className={styles.section}>
          <div className={styles.subTitle}>추천 여행지</div>
          <CircleList baseHref="/spots" items={spotsData} />
        </div>
      </div>
    </>
  );
}
