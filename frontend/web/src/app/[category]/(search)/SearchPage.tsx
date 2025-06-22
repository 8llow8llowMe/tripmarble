import Head from "next/head";
// utils
import { buildMeta } from "@/lib/meta/seo";
// styles
import styles from "./Search.module.scss";
// components
import Input from "@/components/common/Input/Input";

const { title, description } = buildMeta(
  "Search",
  "원하는 여행지를 검색해보세요"
);

export default function SearchPage() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.subTitle}>원하는 여행지를 검색해보세요!</div>
          <Input />
        </div>

        <div className={styles.section}>
          <div className={styles.subTitle}>추천 여행지</div>
          <div className={styles.recommendations}>
            {[...Array(8)].map((_, idx) => (
              <div key={idx} className={styles.circleItem}>
                여행지 {idx + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
