import type { CSSProperties, ReactNode } from "react";
import styles from "./CardGrid.module.scss";

type CardGridProps = {
  children: ReactNode;
  className?: string;
  minItemWidth?: string;
};

export default function CardGrid({
  children,
  className,
  minItemWidth,
}: CardGridProps) {
  const style = minItemWidth
    ? ({ "--card-grid-min": minItemWidth } as CSSProperties)
    : undefined;

  return (
    <section
      className={[styles.grid, className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </section>
  );
}
