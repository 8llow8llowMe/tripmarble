"use client";

import styles from "./AuthLayout.module.scss";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

const getAuthCopy = (pathname: string | null) => {
  if (pathname?.includes("/signup")) {
    return {
      title: "회원가입",
      subtitle: "계정을 만들고 여행 게임을 시작하세요.",
    };
  }

  if (pathname?.includes("/auth/callback")) {
    return {
      title: "계정 확인",
      subtitle: "로그인 정보를 확인하고 있습니다.",
    };
  }

  return {
    title: "로그인",
    subtitle: "다시 이어서 여행을 준비하세요.",
  };
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const copy = getAuthCopy(pathname);

  return (
    <section className={styles.authWrapper}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>TripMarble</p>
        <h1 className={styles.title}>{copy.title}</h1>
        <p className={styles.subtitle}>{copy.subtitle}</p>
      </header>
      <div className={styles.card}>{children}</div>
    </section>
  );
}
