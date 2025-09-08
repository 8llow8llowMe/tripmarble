"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./PolaroidStack.module.scss";

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
            <Image
              src={imgUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.caption}>{name}</div>
        </div>
      </div>
    </Link>
  );
}
