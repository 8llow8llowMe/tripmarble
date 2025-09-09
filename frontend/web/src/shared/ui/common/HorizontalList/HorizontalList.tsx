"use client";

import Link from "next/link";
import Image from "next/image";
import Carousel from "@/shared/ui/common/Carousel/Carousel";
import styles from "./HorizontalList.module.scss";
import {
  HorizontalListItem,
  HorizontalListProps,
} from "@/shared/ui/common/HorizontalList/types";

export default function HorizontalList<T>({
  title,
  items,
  baseHref,
  itemWidth = 160,
  itemHeight = 160,
  gap = 12,
  onItemClick,
}: HorizontalListProps<T>) {
  return (
    <Carousel<HorizontalListItem>
      title={title}
      items={items as any}
      itemWidth={itemWidth}
      gap={gap}
      onItemClick={onItemClick as any}
      renderItem={(item) => {
        const content = (
          <div className={styles.itemWrapper} style={{ width: itemWidth }}>
            <div className={styles.itemThumb} style={{ height: itemHeight }}>
              <Image
                src={item.imgUrl}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, 240px"
                style={{ objectFit: "cover" }}
              />
              <div className={styles.thumbOverlay} />
              <div className={styles.textOverlay}>
                <div className={styles.thumbTitle}>{item.name}</div>
                {item.subtitle && (
                  <div className={styles.thumbSubtitle}>{item.subtitle}</div>
                )}
              </div>
            </div>
          </div>
        );

        return baseHref && !onItemClick ? (
          <Link href={`${baseHref}/${item.id}`}>{content}</Link>
        ) : (
          content
        );
      }}
    />
  );
}
