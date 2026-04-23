import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./MediaCard.module.scss";

type MediaCardVariant = "default" | "overlay";
type MediaCardRatio = "wide" | "landscape" | "square" | "portrait";

type MediaCardProps = {
  href?: string;
  imageUrl: string;
  imageAlt?: string;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  badge?: ReactNode;
  action?: ReactNode;
  variant?: MediaCardVariant;
  ratio?: MediaCardRatio;
  interactive?: boolean;
  className?: string;
  contentClassName?: string;
  loading?: "eager" | "lazy";
};

const ratioClass: Record<MediaCardRatio, string> = {
  wide: styles.ratioWide,
  landscape: styles.ratioLandscape,
  square: styles.ratioSquare,
  portrait: styles.ratioPortrait,
};

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const getImageAlt = (title: ReactNode, imageAlt?: string) => {
  if (imageAlt) return imageAlt;
  return typeof title === "string" ? title : "카드 이미지";
};

export default function MediaCard({
  href,
  imageUrl,
  imageAlt,
  title,
  description,
  meta,
  badge,
  action,
  variant = "default",
  ratio = "landscape",
  interactive,
  className,
  contentClassName,
  loading = "lazy",
}: MediaCardProps) {
  const isInteractive = Boolean(href || interactive);
  const card = (
    <article
      className={cx(
        styles.card,
        styles[variant],
        ratioClass[ratio],
        isInteractive && styles.interactive,
        className
      )}
    >
      <div className={styles.media} aria-hidden={!imageUrl}>
        <img
          src={imageUrl}
          alt={getImageAlt(title, imageAlt)}
          className={styles.image}
          loading={loading}
        />
      </div>
      <div className={cx(styles.content, contentClassName)}>
        {badge ? <div className={styles.badge}>{badge}</div> : null}
        <div className={styles.title}>{title}</div>
        {description ? (
          <div className={styles.description}>{description}</div>
        ) : null}
        {(meta || action) && (
          <div className={styles.footer}>
            {meta ? <div className={styles.meta}>{meta}</div> : null}
            {action ? <div className={styles.action}>{action}</div> : null}
          </div>
        )}
      </div>
    </article>
  );

  if (!href) return card;

  return (
    <Link href={href} className={styles.link}>
      {card}
    </Link>
  );
}
