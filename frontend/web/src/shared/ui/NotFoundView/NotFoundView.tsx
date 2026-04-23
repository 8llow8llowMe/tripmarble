import Link from "next/link";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <section className={styles.panel} aria-labelledby="not-found-title">
        <p className={styles.eyebrow}>404</p>
        <h1 id="not-found-title" className={styles.title}>
          페이지를 찾을 수 없습니다.
        </h1>
        <p className={styles.message}>
          주소가 바뀌었거나 더 이상 제공되지 않는 페이지입니다.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.homeLink}>
            홈으로 이동
          </Link>
        </div>
      </section>
    </main>
  );
}
