"use client";

import styles from "./PolaroidStack.module.scss";
import PolaroidCard from "./PolaroidCard";

type Props = {
  className?: string;
  count?: number;
  items?: { id: number | string; name: string; imgUrl: string }[];
};

export default function PolaroidStack({
  className = "",
  count = 5,
  items = [],
}: Props) {
  const list = items.slice(0, count);

  return (
    <div className={className}>
      <div className={styles.stack}>
        {list.map((item: any, i: number) => (
          <div key={item.id} data-polaroid-card>
            <div data-polaroid-body style={{ position: "relative" }}>
              <PolaroidCard
                id={item.id}
                name={item.name}
                imgUrl={item.imgUrl}
                zIndex={10 + i}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
