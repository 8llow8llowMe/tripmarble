import type { ReactNode } from "react";
import styles from "./AuthStatusView.module.scss";

type AuthStatusViewProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export default function AuthStatusView({
  eyebrow = "TripMarble",
  title,
  description,
  action,
}: AuthStatusViewProps) {
  return (
    <section className={styles.status} aria-live="polite">
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.title}>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
      {action ? <div className={styles.action}>{action}</div> : null}
    </section>
  );
}
