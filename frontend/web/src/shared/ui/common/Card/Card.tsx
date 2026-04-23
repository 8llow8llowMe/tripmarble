import type { ReactNode } from "react";
import MediaCard from "./MediaCard";

type Props = {
  href?: string;
  imageUrl: string;
  imageAlt?: string;
  regionName?: string;
  badge?: ReactNode;
  title: string;
  description?: string;
  date?: string;
  interactive?: boolean;
};

export default function Card({
  href,
  imageUrl,
  imageAlt,
  regionName,
  badge,
  title,
  description,
  date,
  interactive,
}: Props) {
  return (
    <MediaCard
      href={href}
      imageUrl={imageUrl}
      imageAlt={imageAlt}
      badge={badge ?? regionName}
      title={title}
      description={description}
      meta={date}
      interactive={interactive}
    />
  );
}
