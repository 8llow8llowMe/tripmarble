"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";

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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
    dragFree: true,
    skipSnaps: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className={styles.wrapper}>
      {(title || true) && (
        <div className={styles.titleRow}>
          {<h2 className={styles.title}>{title}</h2>}
          <div className={styles.arrowButtons}>
            <button onClick={scrollPrev} className={styles.arrow}>
              &lt;
            </button>
            <button onClick={scrollNext} className={styles.arrow}>
              &gt;
            </button>
          </div>
        </div>
      )}

      {/* viewport: gap 변수 주입 (패딩과 트랙 간격을 동기화) */}
      <div
        className={styles.embla}
        ref={emblaRef}
        style={{ ["--embla-gap" as any]: `${gap}px` }}
      >
        {/* track */}
        <div className={styles.emblaContainer}>
          {items.map((item: HorizontalListItem, index: number) => {
            const CardInner = (
              <div
                className={styles.itemWrapper}
                style={{ width: itemWidth, flex: `0 0 ${itemWidth}px` }}
                onClick={(e) => {
                  const clickAllowed = (emblaApi as any)?.clickAllowed?.();
                  if (clickAllowed === false) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  if (onItemClick) {
                    e.preventDefault();
                    onItemClick(item);
                  }
                }}
              >
                <Image
                  className={styles.image}
                  src={item.imgUrl}
                  alt={item.name}
                  width={itemWidth}
                  height={itemHeight}
                  style={{
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "2px solid #eeeeee",
                  }}
                />
                <div className={styles.itemTitle}>{item.name}</div>
                {item.subtitle && (
                  <div className={styles.itemSubtitle}>{item.subtitle}</div>
                )}
              </div>
            );

            return baseHref ? (
              <Link key={`slide-${index}`} href={`${baseHref}/${item.id}`}>
                {CardInner}
              </Link>
            ) : (
              <div key={`slide-${index}`}>{CardInner}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
