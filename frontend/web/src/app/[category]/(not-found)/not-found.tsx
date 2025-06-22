import Head from "next/head";
import Link from "next/link";
import styles from "./NotFound.module.scss";
import { buildMeta } from "@/lib/meta/seo";

const { title, description } = buildMeta(
  "404 Error",
  "페이지를 찾을 수 없습니다."
);

export default function NotFound() {
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
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>
          죄송합니다. 해당 페이지를 찾을 수 없습니다.
        </p>
        <Link href="/" className={styles.homeLink}>
          홈으로 돌아가기
        </Link>
      </div>
    </>
  );
}
