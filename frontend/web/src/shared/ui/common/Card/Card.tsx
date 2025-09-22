import Link from "next/link";
import styles from "./Card.module.scss";

type Props = {
  href?: string;
  imageUrl: string;
  regionName?: string;
  title: string;
  description?: string;
  date?: string;
};

export default function Card({
  href,
  imageUrl,
  regionName,
  title,
  description,
  date,
}: Props) {
  const Content = (
    <div className={styles.card}>
      <div className={styles.thumb}>
        <img
          src={imageUrl}
          alt={title}
          className={styles.thumbImage}
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        {regionName && <div className={styles.tag}>{regionName}</div>}
        <div className={styles.title}>{title}</div>
        {description && <div className={styles.desc}>{description}</div>}
        {date && (
          <div className={styles.meta}>
            <span className={styles.date}>{date}</span>
          </div>
        )}
      </div>
    </div>
  );

  return href ? <Link href={href}>{Content}</Link> : Content;
}
