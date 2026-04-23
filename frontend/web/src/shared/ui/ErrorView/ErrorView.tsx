"use client";

import { useEffect } from "react";
import Button from "@/shared/ui/common/Button/Button";
import styles from "./ErrorView.module.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.container}>
      <section className={styles.panel} aria-labelledby="error-title">
        <p className={styles.eyebrow}>Error</p>
        <h1 id="error-title" className={styles.title}>
          문제가 발생했습니다.
        </h1>
        <p className={styles.message}>
          페이지를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해
          주세요.
        </p>
        {error.message ? (
          <p className={styles.detail}>{error.message}</p>
        ) : null}
        <div className={styles.actions}>
          <Button type="button" variant="primary" size="md" onClick={reset}>
            다시 시도
          </Button>
        </div>
      </section>
    </main>
  );
}
