"use client";

import Card from "@/shared/ui/common/Card/Card";
import Carousel from "@/shared/ui/common/Carousel/Carousel";

export interface CardListItem {
  id: string;
  href?: string;
  imageUrl: string;
  regionName?: string;
  title: string;
  description?: string;
  date?: string;
}

export default function CardList({
  items,
  title,
  itemWidth = 250,
  gap = 18,
  onItemClick,
}: {
  items: CardListItem[];
  title?: string;
  itemWidth?: number;
  gap?: number;
  onItemClick?: (item: CardListItem) => void;
}) {
  return (
    <Carousel<CardListItem>
      title={title}
      items={items}
      itemWidth={itemWidth}
      gap={gap}
      onItemClick={onItemClick}
      renderItem={(item) =>
        onItemClick ? (
          <Card
            imageUrl={item.imageUrl}
            regionName={item.regionName}
            title={item.title}
            description={item.description}
            date={item.date}
          />
        ) : (
          <Card
            href={item.href}
            imageUrl={item.imageUrl}
            regionName={item.regionName}
            title={item.title}
            description={item.description}
            date={item.date}
          />
        )
      }
    />
  );
}
