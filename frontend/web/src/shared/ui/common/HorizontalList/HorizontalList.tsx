"use client";

import CardRail from "@/shared/ui/common/Card/CardRail";
import MediaCard from "@/shared/ui/common/Card/MediaCard";
import {
  HorizontalListItem,
  HorizontalListProps,
} from "@/shared/ui/common/HorizontalList/types";

const getRatio = (
  width: number,
  height: number
): "portrait" | "square" | "landscape" => {
  if (height > width) return "portrait";
  if (height === width) return "square";
  return "landscape";
};

export default function HorizontalList<T>({
  title,
  items,
  baseHref,
  itemWidth = 160,
  itemHeight = 160,
  gap = 16,
  onItemClick,
}: HorizontalListProps<T>) {
  const ratio = getRatio(itemWidth, itemHeight);

  return (
    <CardRail<HorizontalListItem>
      title={title}
      items={items as any}
      itemWidth={itemWidth}
      gap={gap}
      onItemClick={onItemClick as any}
      renderItem={(item) => {
        const href =
          baseHref && !onItemClick ? `${baseHref}/${item.id}` : undefined;

        return (
          <MediaCard
            href={href}
            imageUrl={item.imgUrl}
            imageAlt={item.name}
            title={item.name}
            description={item.subtitle}
            variant="overlay"
            ratio={ratio}
            interactive={Boolean(onItemClick)}
          />
        );
      }}
    />
  );
}
