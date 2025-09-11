"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./Carousel.module.scss";
import { ArrowLeftIcon, ArrowRightIcon } from "@/shared/assets/icons";

type CarouselProps<T> = {
  title?: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemWidth?: number;
  gap?: number;
  showArrows?: boolean;
  onItemClick?: (item: T) => void;
};

export default function Carousel<T>({
  title,
  items,
  renderItem,
  itemWidth = 250,
  gap = 18,
  showArrows = true,
  onItemClick,
}: CarouselProps<T>) {
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
      {(title || title === "") && (
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{title}</h2>
          {showArrows && (
            <div className={styles.arrowButtons}>
              <button onClick={scrollPrev} className={styles.arrow}>
                <ArrowLeftIcon />
              </button>
              <button onClick={scrollNext} className={styles.arrow}>
                <ArrowRightIcon />
              </button>
            </div>
          )}
        </div>
      )}

      <div
        className={styles.embla}
        ref={emblaRef}
        style={{ ["--embla-gap" as any]: `${gap}px` }}
      >
        <div className={styles.emblaContainer}>
          {items.map((item, index) => (
            <div
              key={index}
              className={styles.slide}
              style={{ width: itemWidth, flex: `0 0 ${itemWidth}px` }}
              onClick={(e) => {
                if (!onItemClick) return;
                const clickAllowed = (emblaApi as any)?.clickAllowed?.();
                if (clickAllowed === false) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                onItemClick(item);
              }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
