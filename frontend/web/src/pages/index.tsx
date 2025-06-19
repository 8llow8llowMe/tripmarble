import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>TripMarble | Home</title>
        <meta name="description" content="여행을 색다르게 즐겨보세요" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.hero}>
        <h1 className={styles.title}>TripMarble</h1>
        <p className={styles.subtitle}>
          "보드판 위 여행지를 돌며 새로운 추억을 만들어보세요."
        </p>
        <Link href="/recommend">
          <button className={styles.cta}>랜덤 여행지 추천받기</button>
        </Link>
      </div>
    </>
  );
}
