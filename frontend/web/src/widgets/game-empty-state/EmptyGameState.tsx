"use client";

import styles from "./EmptyGameState.module.scss";
import { NoGame } from "@/shared/assets/images";

type EmptyGameStateProps = {
  message?: string;
  className?: string;
  role?: "status" | "alert";
};

const fallbackMessage = "현재 표시할 게임이 없어요.";
const emptyIllustration = typeof NoGame === "string" ? NoGame : NoGame.src;

function mergeClassNames(...names: Array<string | undefined | false>) {
  return names.filter(Boolean).join(" ");
}

const EmptyGameState = ({
  message = fallbackMessage,
  className,
  role = "status",
}: EmptyGameStateProps) => {
  return (
    <div
      className={mergeClassNames(styles.emptyState, className)}
      role={role}
      aria-live="polite"
    >
      <div className={styles.emptyImageWrapper}>
        <img
          src={emptyIllustration}
          alt="표시할 게임이 없음"
          className={styles.emptyImage}
          loading="lazy"
        />
        <div className={styles.emptyOverlay}>
          <div className={styles.emptyText}>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default EmptyGameState;
