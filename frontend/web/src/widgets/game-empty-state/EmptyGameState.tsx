"use client";

import type { ReactNode } from "react";
import styles from "./EmptyGameState.module.scss";

type EmptyGameStateProps = {
  title?: string;
  message?: string;
  action?: ReactNode;
  className?: string;
  role?: "status" | "alert";
};

const fallbackTitle = "표시할 게임이 없습니다.";
const fallbackMessage = "새 게임을 만들거나 다른 목록을 확인해 주세요.";

function mergeClassNames(...names: Array<string | undefined | false>) {
  return names.filter(Boolean).join(" ");
}

const EmptyGameState = ({
  title = fallbackTitle,
  message = fallbackMessage,
  action,
  className,
  role = "status",
}: EmptyGameStateProps) => {
  return (
    <div
      className={mergeClassNames(styles.emptyState, className)}
      role={role}
      aria-live="polite"
    >
      <p className={styles.eyebrow}>TripMarble</p>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
};

export default EmptyGameState;
