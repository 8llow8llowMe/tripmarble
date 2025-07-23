"use client";

import styles from "./AuthLayout.module.scss";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname?.includes("/login");
  const isSignup = pathname?.includes("/signup");

  const title = isLogin
    ? "TripMarble 로그인"
    : isSignup
    ? "TripMarble 회원가입"
    : "TripMarble";

  return (
    <div className={styles.authWrapper}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.card}>{children}</div>
    </div>
  );
}
