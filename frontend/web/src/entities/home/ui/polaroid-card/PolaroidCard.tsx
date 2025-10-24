"use client";

import Link from "next/link";
import styles from "../polaroid-stack/PolaroidStack.module.scss";

type Props = {
  id: number | string;
  name: string;
  imgUrl: string;
};

export default function PolaroidCard({ id, name, imgUrl }: Props) {
  return (
    <Link href={`/spots/${id}`} className={styles.card}>
      <div className={styles.cardBody}>
        <div className={styles.pin} />
        <div className={styles.thumb}>
          <img
            src={imgUrl}
            alt={name}
            className={styles.thumbImage}
            loading="lazy"
          />
        </div>
        <div className={styles.caption}>{name}</div>
      </div>
    </Link>
  );
}
