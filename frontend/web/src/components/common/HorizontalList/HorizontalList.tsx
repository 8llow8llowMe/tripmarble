import { useRef } from "react";
import Link from "next/link";
import styles from "./HorizontalList.module.scss";
import Image, { StaticImageData } from "next/image";

type HorizontalListProps<T> = {
  title?: string;
  items: { id: number; name: string; imgUrl: StaticImageData }[];
  baseHref: string;
  itemWidth?: number;
  itemHeight?: number;
  gap?: number;
};

export default function HorizontalList<T>({
  title,
  items,
  baseHref,
  itemWidth = 160,
  itemHeight = 160,
  gap = 12,
}: HorizontalListProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const visibleItems = [...items, ...items];

  // 마우스 드래그 스크롤 이벤트
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    scrollRef.current?.classList.add(styles.active);
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    scrollRef.current?.classList.remove(styles.active);
  };
  const handleMouseUp = () => {
    isDown.current = false;
    scrollRef.current?.classList.remove(styles.active);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1; // Multiply for sensitivity
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const scrollByAmount = itemWidth + gap;

  const scrollLeftByOne = () => {
    scrollRef.current?.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  };

  const scrollRightByOne = () => {
    scrollRef.current?.scrollBy({ left: scrollByAmount, behavior: "smooth" });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.arrowButtons}>
          <button onClick={scrollLeftByOne} className={styles.arrow}>
            &lt;
          </button>
          <button onClick={scrollRightByOne} className={styles.arrow}>
            &gt;
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className={styles.scrollContainer}
        style={{ gap: `${gap}px` }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onDragStart={(e) => e.preventDefault()}
      >
        {visibleItems.map((item, index) => (
          <Link key={index} href={`${baseHref}/${item.id}`}>
            <div
              className={styles.itemWrapper}
              style={{ minWidth: itemWidth, minHeight: itemHeight }}
            >
              <div>
                <Image
                  src={item.imgUrl}
                  alt={item.name}
                  width={itemWidth}
                  height={itemHeight}
                  style={{ objectFit: "cover", borderRadius: 8 }}
                />
                <div style={{ textAlign: "left", marginTop: 4 }}>
                  {item.name}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
