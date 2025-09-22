"use client";

import Link from "next/link";
import styles from "../polaroid-stack/PolaroidStack.module.scss";

type Props = {
  id: number | string;
  name: string;
  imgUrl: string;
  zIndex: number;
};

export default function PolaroidCard({ id, name, imgUrl, zIndex }: Props) {
  return (
    <Link href={`/spots/${id}`}>
      <div className={styles.card} style={{ zIndex }}>
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
      </div>
    </Link>
  );
}
