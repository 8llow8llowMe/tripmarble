"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";

import styles from "./HorizontalList.module.scss";
import { HorizontalListProps } from "@/shared/ui/common/HorizontalList/types";

export default function HorizontalList<T>({
  title,
  items,
  baseHref,
  itemWidth = 160,
  itemHeight = 160,
  gap = 12,
}: HorizontalListProps<T>) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    // slidesToScroll: 1,
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.arrowButtons}>
          <button onClick={scrollPrev} className={styles.arrow}>
            &lt;
          </button>
          <button onClick={scrollNext} className={styles.arrow}>
            &gt;
          </button>
        </div>
      </div>

      {/* viewport: gap 변수 주입 (패딩과 트랙 간격을 동기화) */}
      <div
        className={styles.embla}
        ref={emblaRef}
        style={{ ["--embla-gap" as any]: `${gap}px` }}
      >
        {/* track */}
        <div className={styles.emblaContainer}>
          {([...items, ...items] as any[]).map((item: any, index: number) => (
            <Link key={`slide-${index}`} href={`${baseHref}/${item.id}`}>
              <div
                className={styles.itemWrapper}
                style={{
                  width: itemWidth,
                  flex: `0 0 ${itemWidth}px`,
                }}
                onClick={(e) => {
                  const clickAllowed = (emblaApi as any)?.clickAllowed?.();
                  if (clickAllowed === false) {
                    e.preventDefault();
                    e.stopPropagation();
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
