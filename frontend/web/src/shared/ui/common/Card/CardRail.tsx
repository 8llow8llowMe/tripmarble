"use client";

import type { ReactNode } from "react";
import Carousel from "@/shared/ui/common/Carousel/Carousel";

type CardRailProps<T> = {
  title?: string;
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemWidth?: number;
  gap?: number;
  showArrows?: boolean;
  onItemClick?: (item: T) => void;
};

export default function CardRail<T>({
  title,
  items,
  renderItem,
  itemWidth = 250,
  gap = 16,
  showArrows = true,
  onItemClick,
}: CardRailProps<T>) {
  return (
    <Carousel<T>
      title={title}
      items={items}
      itemWidth={itemWidth}
      gap={gap}
      showArrows={showArrows}
      onItemClick={onItemClick}
      renderItem={renderItem}
    />
  );
}
