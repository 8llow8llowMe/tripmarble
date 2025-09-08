import { StaticImageData } from "next/image";

export type HorizontalListItem = {
  id: string | number;
  name: string;
  imgUrl: string | StaticImageData;
  subtitle?: string;
};

export type HorizontalListProps<T> = {
  title?: string;
  items: HorizontalListItem[];
  baseHref?: string;
  itemWidth?: number;
  itemHeight?: number;
  gap?: number;
  onItemClick?: (item: HorizontalListItem) => void;
};
