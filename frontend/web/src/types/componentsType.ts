import { StaticImageData } from "next/image";

export type HorizontalListProps<T> = {
  title?: string;
  items: {
    id: number;
    name: string;
    imgUrl: string | StaticImageData;
  }[];
  baseHref: string;
  itemWidth?: number;
  itemHeight?: number;
  gap?: number;
};

export type FilterOption = {
  contentTypeId: string;
  contentTypeName: string;
};
