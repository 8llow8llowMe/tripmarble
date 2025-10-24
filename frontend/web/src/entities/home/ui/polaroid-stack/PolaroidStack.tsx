"use client";

import PolaroidCard from "@/entities/home/ui/polaroid-card/PolaroidCard";
import styles from "./PolaroidStack.module.scss";

type Props = {
  className?: string;
  count?: number;
  items?: { id: number | string; name: string; imgUrl: string }[];
};

export default function PolaroidStack({
  className = "",
  count = 6,
  items = [],
}: Props) {
  const list = items.slice(0, count);
  const angles = [-6, 4, -2, 5, -4, 2];

  return (
    <div className={className}>
      <div className={styles.grid}>
        {list.map((item: any, i: number) => (
          <div key={item.id} data-polaroid-card>
            <div
              data-polaroid-body
              style={{
                position: "relative",
                transform: `rotate(${angles[i % angles.length]}deg)`,
              }}
            >
              <PolaroidCard
                id={item.id}
                name={item.name}
                imgUrl={item.imgUrl}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
